# Check GCode with Node 12

Do this hack at your own risk. This might not work. `¯\_(ツ)_/¯`


<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Check GCode with Node 12](#check-gcode-with-node-12)
  - [Flash your Arduino](#flash-your-arduino)
  - [Go into the folder](#go-into-the-folder)
  - [Install Dependencies](#install-dependencies)
  - [Run it](#run-it)

<!-- /code_chunk_output -->

## Flash your Arduino

Upload GRBL or this small sketch to your Arduino board.

```arduino
void setup() {
Serial.begin(115200);
}
void loop() {}
```

## Go into the folder

```bash
cd check-gcode-with-node-12
```

## Install Dependencies

Install the dependencies. The problem with cncjs is, that it is using a version of serialport that is not compatible with Node 12. This will overwrite it with the latest compatible one.

```bash
npm install
```

## Run it

The below command will give you an URL in the terminal where you can find cncjs. Normally [localhost:8000](http://localhost:8000)


```bash
npm start
```
