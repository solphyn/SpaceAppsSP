#include <FS.h>
#include <ArduinoOTA.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>
#include <PubSubClient.h> 

#include <ESP8266HTTPClient.h>

#include <WiFiClient.h>


const int LM35 = A0; 
float temperatura;



char *BROKER_MQTT = "192.168.0.1";             
int BROKER_PORT = 1883;                        
#define TOPICO_SUBSCRIBE "SpaceAppsSub"
#define TOPICO_PUBLISH "SpaceAppsPub"
WiFiClient espClient;               
PubSubClient MQTT(espClient);      
const int led = 16;                 //D0
const int button = 4;               //D2
const boolean outputButton = false; //D2
String rede;
String senha;
String ip;
String macAddress;
char *p, *i;
int httpCode = 0;
ADC_MODE(ADC_VCC);

unsigned int vbatt;
int temp = 0;
String api_endpoint = "http://20.0.33.41:3000";
char ID_MQTT[256] = "ads";

const char *networkWireless = "SPACE APPS SP PARTICIPANTES";
const char *networkPassword = "";

temperatura = (float(analogRead(LM35))*5/(1023))/0.01;

int ledStatus = 0;

HTTPClient http;
bool shouldSaveConfig = false;

void initWifi(String networkName, String networkPassword, String ip)
{
  if (ip != api_endpoint)
  {
    api_endpoint = ip + ":3000";
  }
  Serial.print("new endpoint " + api_endpoint);
  WiFi.begin(networkName, networkPassword);
  Serial.print("Connecting to ");
  Serial.println(networkName);
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(200);
    int b = 0;
    while (digitalRead(button) == 1)
    {
      Serial.println("segurando");
      b++;
      
      delay(1000);
    }
    if (b > 3 && b < 5)
    {
      Serial.println("resetando");
      ESP.restart();
    }
    if (b > 5)
    {
      Serial.println("resetando e formatando");
      SPIFFS.format();
      ESP.restart();
    }
  }
  macAddress = WiFi.macAddress();
  macAddress.toCharArray(ID_MQTT, 256);

  Serial.println("conectado a: " + networkName);
}
String makeRequest(String path)
{
  http.begin(api_endpoint + path);
  Serial.println(api_endpoint + path);
  httpCode = http.GET();
  if (httpCode < 0)
  {
    Serial.println("request error - " + httpCode);
    return "";
  }
  if (httpCode != HTTP_CODE_OK)
  {
    Serial.println("code not ok - " + http.getString());
    return "";
  }
  String response = http.getString();
  Serial.println("request - " + response);
  http.end();
  return response;
}

void mqtt_callback(char *topic, byte *payload, unsigned int length)
{

  Serial.print("Message arrived in topic: ");
  Serial.println(topic);

  Serial.print("Message:");
  for (int i = 0; i < length; i++)
  {
    Serial.print((char)payload[i]);
  }
  ledStatus = !ledStatus;
  digitalWrite(led, ledStatus);
  Serial.println();
  Serial.println("-----------------------");
}

void initMQTT()
{
  char ipMqtt[256];
  ip.toCharArray(ipMqtt, 256);
  MQTT.setServer(ipMqtt, BROKER_PORT); 
  MQTT.setCallback(mqtt_callback);  
}
void saveConfigCallback()
{
  Serial.println("Should save config");
  shouldSaveConfig = true;
}
void sendMQTT()
{
  Serial.println("send msg MQTT");
  String mac = ID_MQTT;
  MQTT.publish("device/button/", ID_MQTT);
}
void sendInsertTable()
{
  Serial.println("send msg MQTT");
  String mac = ID_MQTT;
  MQTT.publish("device/button/inserttable", ID_MQTT);
}
void ICACHE_RAM_ATTR IntCallback()
{
  Serial.print("Stamp(ms): ");
  Serial.println(millis());
  Serial.println("read of button");
  Serial.println();
  sendMQTT();

 
  delay(500);

}
void setup()
{
  Serial.begin(9600);
  pinMode(button, INPUT);
  pinMode(LED_BUILTIN, OUTPUT);

  if (SPIFFS.begin())
  {
    Serial.println("mounted file system");
    File f = SPIFFS.open("/config.txt", "r");

    if (!f)
    {
      Serial.println("size file:");
      Serial.print("Connecting to ");
      Serial.println(networkWireless);
      initWifi(networkWireless, networkPassword, api_endpoint);

      f.close();
      File fWrite = SPIFFS.open("/config.txt", "w");

      String responseRequestForConfiguration = makeRequest("v1/configurations/listConfigurationForDevice");
      Serial.println("response request: " + responseRequestForConfiguration);

      fWrite.print(responseRequestForConfiguration);
      fWrite.close();
      ESP.restart();
    }
    else
    {
      Serial.println("Reading Data from File-:");
      String data;
     
      for (int z = 0; z < f.size(); z++) 
      {
        char d = (char)f.read();
        data += d;
        Serial.print(d);
      }
      f.close(); 
      Serial.println("File Closed");

      Serial.println("##[RESULT - DATA]## ==> " + data);
      char payloadChar[256];
      data.toCharArray(payloadChar, 256);
      p = strtok_r(payloadChar, "[:]", &i);
      Serial.println("rede");
      rede = p;
      Serial.println(rede);

      p = strtok_r(NULL, "[:]", &i);
      Serial.println("senha");
      senha = p;
      Serial.println(senha);

      p = strtok_r(NULL, "[:]", &i);
      Serial.println("ip");
      ip = p;
      Serial.println(ip);
      initWifi(rede, senha, ip);
    }
  }
  else
  {
    Serial.println("failed to mount FS");
    delay(5000);
    ESP.restart();
  }

  initMQTT();
  while (!MQTT.connected())
  {
    if (MQTT.connect(ID_MQTT))
    {
      Serial.println("Conectado com sucesso ao broker MQTT!");
    }
    else
    {
      Serial.println("Falha ao reconectar no broker.");
      Serial.println("Havera nova tentatica de conexao em 2s");
      delay(2000);
    }
  }

  
  vbatt = ESP.getVcc();
  Serial.println("vcc");
  Serial.println(vbatt);

  
  char subMqttTopc[15] = "desable/ligth/";
  char result[255]; 

  strcpy(result, subMqttTopc); 
  strcat(result, ID_MQTT);

  MQTT.subscribe(result);
  digitalWrite(led, ledStatus);
}

int t = 0;
void reconectWiFi()
{
  
  if (WiFi.status() == WL_CONNECTED)
    return;

  WiFi.begin(rede, senha);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(100);
    Serial.print(".");
  }

  Serial.println();
  Serial.print("Conectado com sucesso na rede ");
  Serial.print(networkWireless);
  Serial.println("IP obtido: ");
  Serial.println(WiFi.localIP());
}
void reconnectMQTT()
{
  while (!MQTT.connected())
  {
    Serial.print("* Tentando se conectar ao Broker MQTT: ");
    Serial.println(BROKER_MQTT);
    if (MQTT.connect(ID_MQTT))
    {
      Serial.println("Conectado com sucesso ao broker MQTT!");
      MQTT.subscribe(TOPICO_SUBSCRIBE);
    }
    else
    {
      Serial.println("Falha ao reconectar no broker.");
      Serial.println("Havera nova tentatica de conexao em 2s");
      delay(2000);
    }
  }
 
}
void VerificaConexoesWiFIEMQTT(void)
{
  if (!MQTT.connected())
    reconnectMQTT(); 

  reconectWiFi(); 
}

void loop()
{

  MQTT.loop();
  int b = 0;
  while (digitalRead(button) == 1)
  {
    Serial.println("segurando");
    b++;

    delay(1000);
  }
  if (b >= 1 && b <= 2)
  {
    VerificaConexoesWiFIEMQTT();
    Serial.println("ledStatus");
    Serial.println(ledStatus);
  
    ledStatus = !ledStatus;
    digitalWrite(led, ledStatus);

    sendMQTT();
  }
  if (b > 2 && b < 5)
  {
    Serial.println("resetando");
    ESP.restart();
  }
  else if (b > 5 && b < 10)
  {
    VerificaConexoesWiFIEMQTT();
    Serial.println("registrando na tabela");
    sendInsertTable();
  }
  else if (b > 10)
  {
    Serial.println("resetando e formatando");
    SPIFFS.format();
    ESP.restart();
  }

}
