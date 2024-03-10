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
        "description": "Find out more",
        "url": "https://tv-back.liara.run/api/v1/verify"
      }
    },
    {
      "name": "banner",
      "description": "get all banner",
      "externalDocs": {
        "description": "Find out more",
        "url": "https://tv-back.liara.run/api/v1/banner"
      }
    },
    {
      "name": "pet",
      "description": "pet description"
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
            "api_key": ["123"]
          }
        ]
      }
    }
  },
  "securityDefinitions": {
    "api_key": {
      "type": "apiKey",
      "name": "api_key",
      "in": "header"
    },
    "petstore_auth": {
      "type": "oauth2",
      "authorizationUrl": "https://petstore.swagger.io/oauth/authorize",
      "flow": "implicit",
      "scopes": {
        "read:pets": "read your pets",
        "write:pets": "modify pets in your account"
      }
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
            "id": {
              "type": "string",
              "example": "1"
            },
            "videoId": {
              "type": "string",
              "example": "1"
            },
            "videoImage": {
              "type": "string",
              "example": "1"
            },
            "title": {
              "type": "string",
              "example": "1"
            },
            "videoUrl": {
              "type": "string",
              "example": "1"
            },
            "imageUrl": {
              "type": "string",
              "example": "1"
            },
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
    }
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