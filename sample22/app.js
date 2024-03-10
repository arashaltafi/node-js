const express = require('express');
const http = require('http');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const server = http.createServer(app);
const cors = require('cors');
const bodyParser = require('body-parser');

// handle middlewares
app.use(cors());
app.use(bodyParser.json());

const options = {
  swaggerOptions: {
    validatorUrl: null
  },
  customCss: '.swagger-ui .topbar { display: none }',
  swaggerOptions: {
    url: 'http://localhost/swagger.json'
  }
};

const optionsLocal = {
  swaggerOptions: {
    validatorUrl: null
  },
  customCss: '.swagger-ui .topbar { display: none }'
};

const jsonGenerated = {
  "swagger": "2.0",
  "host": "tv-back.liara.run/",
  "basePath": "api/v1",
  "tags": [
    {
      "name": "verify",
      "description": "login / register / Check Validation Code",
      "externalDocs": {
        "description": "برای مشاهده بیشتر کلیک کنید",
        "url": "https://tv-back.liara.run/api/v1/verify"
      }
    },
    {
      "name": "banner",
      "description": "get all banner",
      "externalDocs": {
        "description": "برای مشاهده بیشتر کلیک کنید",
        "url": "https://tv-back.liara.run/api/v1/banner"
      }
    },
    {
      "name": "report",
      "description": "send report",
      "externalDocs": {
        "description": "برای مشاهده بیشتر کلیک کنید",
        "url": "https://tv-back.liara.run/api/v1/report"
      }
    }
  ],
  "schemes": [
    "https",
    "http"
  ],
  "paths": {
    "/verify": {
      "post": {
        "tags": [
          "verify"
        ],
        "summary": "send phone to get sms",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "send phone number",
            "required": true,
            "schema": {
              "$ref": "#/definitions/verifyBody"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "موفقیت آمیز",
            "schema": {
              "$ref": "#/definitions/verifyResponse200"
            }
          },
          "400": {
            "description": "خطای سمت کاربر",
            "schema": {
              "$ref": "#/definitions/verifyResponse400"
            }
          },
          "500": {
            "description": "خطای سمت سرور",
            "schema": {
              "$ref": "#/definitions/verifyResponse500"
            }
          }
        }
      }
    },
    "/verify/checkCode": {
      "post": {
        "tags": [
          "verify"
        ],
        "summary": "Send ValidationCode to Check and return token",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "send validation number",
            "required": true,
            "schema": {
              "$ref": "#/definitions/checkCodeBody"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "موفقیت آمیز",
            "schema": {
              "$ref": "#/definitions/checkCodeResponse200"
            }
          },
          "400": {
            "description": "خطای سمت کاربر",
            "schema": {
              "$ref": "#/definitions/checkCodeResponse400"
            }
          },
          "500": {
            "description": "خطای سمت سرور",
            "schema": {
              "$ref": "#/definitions/checkCodeResponse500"
            }
          }
        }
      }
    },

    "/banner/getAll": {
      "get": {
        "tags": [
          "banner"
        ],
        "summary": "get all banners",
        "responses": {
          "200": {
            "description": "موفقیت آمیز",
            "schema": {
              "$ref": "#/definitions/bannerResponse200"
            }
          },
          "401": {
            "description": "خطای سمت کاربر",
            "schema": {
              "$ref": "#/definitions/bannerResponse401"
            }
          },
          "500": {
            "description": "خطای سمت سرور",
            "schema": {
              "$ref": "#/definitions/bannerResponse500"
            }
          }
        },
        "security": [
          {
            "Authorization": ["123"]
          }
        ]
      }
    },

    "/report": {
      "post": {
        "tags": [
          "report"
        ],
        "summary": "send report",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "send videoId, videoTitle, videoLink, videoImage in body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/reportBody"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "موفقیت آمیز",
            "schema": {
              "$ref": "#/definitions/reportResponse200"
            }
          },
          "400": {
            "description": "خطای سمت کاربر",
            "schema": {
              "$ref": "#/definitions/reportResponse400"
            }
          },
          "500": {
            "description": "خطای سمت سرور",
            "schema": {
              "$ref": "#/definitions/reportResponse500"
            }
          }
        },
        "security": [
          {
            "Authorization": ["123"]
          }
        ]
      }
    },
  },
  "securityDefinitions": {
    "Authorization": {
      "type": "apiKey",
      "name": "Authorization",
      "in": "header"
    }
  },
  "definitions": {
    "verifyResponse200": {
      "type": "object",
      "properties": {
        "state": {
          "type": "string",
          "example": "ok"
        },
        "message": {
          "type": "string",
          "example": "عملیات موفق"
        },
        "data": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "آرش الطافی"
            },
            "phone": {
              "type": "string",
              "example": "09187677641"
            },
            "avatar": {
              "type": "string",
              "example": "https://arashaltafi.ir/arash.jpg"
            },
            "date": {
              "type": "string",
              "example": "1402/03/15"
            }
          }
        }
      }
    },
    "verifyResponse400": {
      "type": "object",
      "properties": {
        "state": {
          "type": "string",
          "example": "err"
        },
        "message": {
          "type": "string",
          "example": "خطا از سمت کاربر - شماره تلفن اشتباه و ..."
        }
      }
    },
    "verifyResponse500": {
      "type": "object",
      "properties": {
        "state": {
          "type": "string",
          "example": "err"
        },
        "message": {
          "type": "string",
          "example": "خطا در ارسال پیامک - خطا در انجام عملیات"
        }
      }
    },
    "verifyBody": {
      "type": "object",
      "required": [
        "phone"
      ],
      "properties": {
        "phone": {
          "type": "string",
          "example": "09187677641"
        }
      }
    },


    "checkCodeResponse200": {
      "type": "object",
      "properties": {
        "state": {
          "type": "string",
          "example": "ok"
        },
        "message": {
          "type": "string",
          "example": "ورود شما با موفقیت انجام شد"
        },
        "data": {
          "type": "object",
          "properties": {
            "token": {
              "type": "string",
              "example": "swfieufhiseufhieasufhaouj8w3q9cf"
            }
          }
        }
      }
    },
    "checkCodeResponse400": {
      "type": "object",
      "properties": {
        "state": {
          "type": "string",
          "example": "err"
        },
        "message": {
          "type": "string",
          "example": "کد وارد شده صحیح نمی باشد"
        }
      }
    },
    "checkCodeResponse500": {
      "type": "object",
      "properties": {
        "state": {
          "type": "string",
          "example": "err"
        },
        "message": {
          "type": "string",
          "example": "خطا در انجام عملیات"
        }
      }
    },
    "checkCodeBody": {
      "type": "object",
      "required": [
        "phone", "code"
      ],
      "properties": {
        "phone": {
          "type": "string",
          "example": "09187677641"
        },
        "code": {
          "type": "string",
          "example": "1234"
        }
      }
    },


    "bannerResponse200": {
      "type": "object",
      "properties": {
        "state": {
          "type": "string",
          "example": "ok"
        },
        "message": {
          "type": "string",
          "example": "عملیات موفق"
        },
        "data": {
          "type": "object",
          "properties": {
            "total": {
              "type": "number",
              "example": 7
            },
            "records": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/bannerItem"
              }
            }
          }
        }
      }
    },
    "bannerResponse401": {
      "type": "object",
      "properties": {
        "state": {
          "type": "string",
          "example": "err"
        },
        "message": {
          "type": "string",
          "example": "ارسال کد کاربر الزامی می باشد"
        }
      }
    },
    "bannerResponse500": {
      "type": "object",
      "properties": {
        "state": {
          "type": "string",
          "example": "err"
        },
        "message": {
          "type": "string",
          "example": "خطا در انجام عملیات"
        }
      }
    },
    "bannerItem": {
      "type": "object",
      "properties": {
        "id": {
          "type": "number",
          "example": 1
        },
        "videoId": {
          "type": "number",
          "example": 35
        },
        "videoImage": {
          "type": "string",
          "example": "https://arashaltafi.ir/tvonline/images/png/ic_tv3.png"
        },
        "title": {
          "type": "string",
          "example": "شبکه 3"
        },
        "videoUrl": {
          "type": "string",
          "example": "https://cdn-bsht1c87.telewebion.com/tv3/live/720p/index.m3u8"
        },
        "imageUrl": {
          "type": "string",
          "example": "https://arashaltafi.ir/tvonline/banner/tv3.jpg"
        }
      }
    },


    "reportResponse200": {
      "type": "object",
      "properties": {
        "state": {
          "type": "string",
          "example": "ok"
        },
        "message": {
          "type": "string",
          "example": "عملیات موفق"
        }
      }
    },
    "reportResponse400": {
      "type": "object",
      "properties": {
        "state": {
          "type": "string",
          "example": "err"
        },
        "message": {
          "type": "string",
          "example": "لطفا لینک شبکه را به صورت متن وارد نمایید"
        }
      }
    },
    "reportResponse500": {
      "type": "object",
      "properties": {
        "state": {
          "type": "string",
          "example": "err"
        },
        "message": {
          "type": "string",
          "example": "خطا در انجام عملیات"
        }
      }
    },
    "reportBody": {
      "type": "object",
      "required": [
        "phone"
      ],
      "properties": {
        "videoId": {
          "type": "string",
          "example": "35"
        },
        "videoTitle": {
          "type": "string",
          "example": "شبکه 3"
        },
        "videoLink": {
          "type": "string",
          "example": "https://cdn-bsht1c87.telewebion.com/tv3/live/720p/index.m3u8"
        },
        "videoImage": {
          "type": "string",
          "example": "https://arashaltafi.ir/tvonline/banner/tv3.jpg"
        }
      }
    },

    
  },
  "externalDocs": {
    "description": "Find out more about Swagger",
    "url": "https://tv-back.liara.run/api/v1/"
  }
}

app.use('/', swaggerUi.serve, swaggerUi.setup(null, options));

app.use('/local', swaggerUi.serve, swaggerUi.setup(jsonGenerated, optionsLocal));

app.use('/swagger', (req, res) => {
  try {
    const a = jsonGenerated;
    res.send(swaggerUi.generateHTML(a, optionsLocal));
  } catch (error) {
    res.status(500).send({
      error: 'Internal Server Error'
    });
  }
});

server.listen(8080, () => {
  console.log('Server listening on *:8080');
});