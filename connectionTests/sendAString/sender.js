//123e028e-d721-46cb-8843-408337572f99 unique id for dancing
//myEvent --event
//payload
/*
{
  "Skill" : "123e028e-d721-46cb-8843-408337572f99",
  "EventName": "MyEvent",
  "Payload": {
    "CustomKey": "CustomValue",
    "AnotherKey": "AnotherValue"
    },
  "Source": "EventSender"
}
----misty 52 --green heart
*/
misty.SendExternalRequest(
  "POST",
  "http://10.12.132.46/api/led?red=255&green=0&blue=0"
);
