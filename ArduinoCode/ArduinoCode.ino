#include <SoftwareSerial.h>

SoftwareSerial SerialBLE(10, 11); // RX, TX

int relay1 = 13;   
int relay2 = 4;   
int relay3 = 5;   
int relay4 = 6;
int pinState1 = LOW;
int pinState2 = LOW;

void setup()
{ 
  Serial.begin(9600);
  SerialBLE.begin(9600);
  pinMode(relay1,OUTPUT);
  pinMode(relay2,OUTPUT);
  pinMode(relay3,OUTPUT);
  pinMode(relay4,OUTPUT);
  
  Serial.println("Waiting for connections...");
}

void loop()
{
   if(SerialBLE.available() > 0){
    char data = SerialBLE.read();
    Serial.println("Inside IF");
    if(data == 'A'){
      pinState1 = pinState1?LOW:HIGH;
      digitalWrite(relay1, pinState1);
    }
    if(data == 'B'){
      pinState2 = pinState2?LOW:HIGH;
      digitalWrite(relay2, pinState2);
    }
   }
}
