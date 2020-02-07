# Generate GCode from SVG

## Setup

```bash
npm install 
```

## Usage

There are three scripts provided.

```json
{
  "scripts":{
    "svgcode": "svgcode",
    "svgcode:help": "svgcode --help",
    "svgcode:example": "svgcode ./src/sketch.svg ./out/sketch.gc --config ./svgcode.config.json"
    }
}
```

Run the script  

```bash
npm run svgcode:example
```
