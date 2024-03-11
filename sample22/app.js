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
    },
    {
      "name": "comment",
      "description": "send / get, comment",
      "externalDocs": {
        "description": "برای مشاهده بیشتر کلیک کنید",
        "url": "https://tv-back.liara.run/api/v1/comment"
      }
    },
    {
      "name": "tv",
      "description": "get all tvs / get all tv by state / search tv",
      "externalDocs": {
        "description": "برای مشاهده بیشتر کلیک کنید",
        "url": "https://tv-back.liara.run/api/v1/tv"
      }
    },
    {
      "name": "profile",
      "description": "edit name, avatar profile",
      "externalDocs": {
        "description": "برای مشاهده بیشتر کلیک کنید",
        "url": "https://tv-back.liara.run/api/v1/profile"
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
              "$ref": "#/models/verifyBody"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "موفقیت آمیز",
            "schema": {
              "$ref": "#/models/verifyResponse200"
            }
          },
          "400": {
            "description": "خطای سمت کاربر",
            "schema": {
              "$ref": "#/models/verifyResponse400"
            }
          },
          "500": {
            "description": "خطای سمت سرور",
            "schema": {
              "$ref": "#/models/verifyResponse500"
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
              "$ref": "#/models/checkCodeBody"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "موفقیت آمیز",
            "schema": {
              "$ref": "#/models/checkCodeResponse200"
            }
          },
          "400": {
            "description": "خطای سمت کاربر",
            "schema": {
              "$ref": "#/models/checkCodeResponse400"
            }
          },
          "500": {
            "description": "خطای سمت سرور",
            "schema": {
              "$ref": "#/models/checkCodeResponse500"
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
              "$ref": "#/models/bannerResponse200"
            }
          },
          "401": {
            "description": "خطای سمت کاربر",
            "schema": {
              "$ref": "#/models/bannerResponse401"
            }
          },
          "500": {
            "description": "خطای سمت سرور",
            "schema": {
              "$ref": "#/models/bannerResponse500"
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
              "$ref": "#/models/reportBody"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "موفقیت آمیز",
            "schema": {
              "$ref": "#/models/reportResponse200"
            }
          },
          "400": {
            "description": "خطای سمت کاربر",
            "schema": {
              "$ref": "#/models/reportResponse400"
            }
          },
          "500": {
            "description": "خطای سمت سرور",
            "schema": {
              "$ref": "#/models/reportResponse500"
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


    "/comment/send": {
      "post": {
        "tags": [
          "comment"
        ],
        "summary": "send comment",
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
            "description": "send idVideo, rating, comment in body",
            "required": true,
            "schema": {
              "$ref": "#/models/sendCommentBody"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "موفقیت آمیز",
            "schema": {
              "$ref": "#/models/sendCommentResponse200"
            }
          },
          "400": {
            "description": "خطای سمت کاربر",
            "schema": {
              "$ref": "#/models/commentResponse400"
            }
          },
          "500": {
            "description": "خطای سمت سرور",
            "schema": {
              "$ref": "#/models/commentResponse500"
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
    "/comment/getMyComments": {
      "get": {
        "tags": [
          "comment"
        ],
        "summary": "get all myComments",
        "responses": {
          "200": {
            "description": "موفقیت آمیز",
            "schema": {
              "$ref": "#/models/myCommentResponse200"
            }
          },
          "401": {
            "description": "کد کاربر صحیح نمی باشد",
            "schema": {
              "$ref": "#/models/commentResponse401"
            }
          },
          "500": {
            "description": "خطای سمت سرور",
            "schema": {
              "$ref": "#/models/commentResponse500"
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
    "/comment/getAll/{id}": {
      "get": {
        "tags": [
          "comment"
        ],
        "summary": "get all comments by id",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Video Id",
            "required": true,
            "type": "integer",
            "format": "int64"
          }
        ],
        "responses": {
          "200": {
            "description": "موفقیت آمیز",
            "schema": {
              "$ref": "#/models/commentResponse200"
            }
          },
          "400": {
            "description": "خطای سمت کاربر",
            "schema": {
              "$ref": "#/models/commentResponse400"
            }
          },
          "500": {
            "description": "خطای سمت سرور",
            "schema": {
              "$ref": "#/models/commentResponse500"
            }
          }
        },
        "produces": [
          "application/json"
        ],
        "security": [
          {
            "Authorization": ["123"]
          }
        ]
      }
    },



    "/profile/sendName": {
      "post": {
        "tags": [
          "profile"
        ],
        "summary": "send name",
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
            "description": "send name in body",
            "required": true,
            "schema": {
              "$ref": "#/models/profileNameBody"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "موفقیت آمیز",
            "schema": {
              "$ref": "#/models/profileNameResponse200"
            }
          },
          "400": {
            "description": "خطای سمت کاربر",
            "schema": {
              "$ref": "#/models/profileNameResponse400"
            }
          },
          "500": {
            "description": "خطای سمت سرور",
            "schema": {
              "$ref": "#/models/profileNameResponse500"
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
    "/profile/sendAvatar": {
      "post": {
        "tags": [
          "profile"
        ],
        "summary": "send avatar",
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
            "description": "send avatar in body",
            "required": true,
            "schema": {
              "$ref": "#/models/profileAvatarBody"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "موفقیت آمیز",
            "schema": {
              "$ref": "#/models/profileAvatarResponse200"
            }
          },
          "400": {
            "description": "خطای سمت کاربر",
            "schema": {
              "$ref": "#/models/profileAvatarResponse400"
            }
          },
          "500": {
            "description": "خطای سمت سرور",
            "schema": {
              "$ref": "#/models/profileNameResponse500"
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


    "/tv/search": {
      "get": {
        "tags": [
          "tv"
        ],
        "summary": "search to all tvs",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "Authorization",
            "in": "header",
            "description": "Set Authorization in Header",
            "required": false,
            "type": "string"
          }, {
            "name": "search",
            "in": "query",
            "description": "search tv title",
            "required": true,
            "type": "string"
          }, {
            "name": "page_number",
            "in": "query",
            "description": "page number",
            "required": false,
            "type": "string",
            "default": "1"
          }, {
            "name": "page_size",
            "in": "query",
            "description": "page size",
            "required": false,
            "type": "string",
            "default": "10"
          }
        ],
        "responses": {
          "200": {
            "description": "موفقیت آمیز",
            "schema": {
              "$ref": "#/models/tvResponse200"
            }
          },
          "400": {
            "description": "خطای سمت کاربر",
            "schema": {
              "$ref": "#/models/tvResponse400"
            }
          },
          "401": {
            "description": "کد کاربر صحیح نمی باشد",
            "schema": {
              "$ref": "#/models/tvResponse401"
            }
          },
          "500": {
            "description": "خطای سمت سرور",
            "schema": {
              "$ref": "#/models/tvResponse500"
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
    "/tv/getAllData": {
      "get": {
        "tags": [
          "tv"
        ],
        "summary": "get all tvs",
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "موفقیت آمیز",
            "schema": {
              "$ref": "#/models/allTvResponse200"
            }
          },
          "500": {
            "description": "خطای سمت سرور",
            "schema": {
              "$ref": "#/models/tvResponse500"
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
    "/tv/getAll": {
      "get": {
        "tags": [
          "tv"
        ],
        "summary": "get all tv by state",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "state",
            "in": "query",
            "description": "state of tvs",
            "required": true,
            "type": "string",
            "enum": [
              "TV_GLOBAL",
              "TV_INTERNATIONAL",
              "TV_EXCLUSIVE",
              "TV_RADIO",
              "TV_SATELLITE",
              "TV_PROVINCIAL"
            ],
            "default": "TV_GLOBAL"
          }, {
            "name": "page_number",
            "in": "query",
            "description": "page number",
            "required": false,
            "type": "string",
            "default": "1"
          }, {
            "name": "page_size",
            "in": "query",
            "description": "page size",
            "required": false,
            "type": "string",
            "default": "10"
          }
        ],
        "responses": {
          "200": {
            "description": "موفقیت آمیز",
            "schema": {
              "$ref": "#/models/tvResponse200"
            }
          },
          "400": {
            "description": "خطای سمت کاربر",
            "schema": {
              "$ref": "#/models/tvResponse400"
            }
          },
          "401": {
            "description": "کد کاربر صحیح نمی باشد",
            "schema": {
              "$ref": "#/models/tvResponse401"
            }
          },
          "500": {
            "description": "خطای سمت سرور",
            "schema": {
              "$ref": "#/models/tvResponse500"
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

  "models": {
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
                "$ref": "#/models/bannerItem"
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


    "sendCommentResponse200": {
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
    "myCommentResponse200": {
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
              "example": 4
            },
            "records": {
              "type": "array",
              "items": {
                "$ref": "#/models/myCommentItem"
              }
            }
          }
        }
      }
    },
    "commentResponse200": {
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
              "example": 4
            },
            "records": {
              "type": "array",
              "items": {
                "$ref": "#/models/commentItem"
              }
            }
          }
        }
      }
    },
    "commentResponse400": {
      "type": "object",
      "properties": {
        "state": {
          "type": "string",
          "example": "err"
        },
        "message": {
          "type": "string",
          "example": "لطفا آیدی را وارد نمایید"
        }
      }
    },
    "commentResponse401": {
      "type": "object",
      "properties": {
        "state": {
          "type": "string",
          "example": "err"
        },
        "message": {
          "type": "string",
          "example": "کد کاربر صحیح نمی باشد"
        }
      }
    },
    "commentResponse500": {
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
    "sendCommentBody": {
      "type": "object",
      "required": [
        "phone"
      ],
      "properties": {
        "idVideo": {
          "type": "string",
          "example": "2"
        },
        "rating": {
          "type": "string",
          "example": "4.5"
        },
        "comment": {
          "type": "string",
          "example": "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
        }
      }
    },
    "myCommentItem": {
      "type": "object",
      "properties": {
        "id": {
          "type": "number",
          "example": 1
        },
        "name": {
          "type": "string",
          "example": "شبکه 1"
        },
        "state": {
          "type": "string",
          "example": "TV_GLOBAL"
        },
        "image": {
          "type": "string",
          "example": "https://arashaltafi.ir/tvonline/images/png/ic_tv1.png"
        },
        "rating": {
          "type": "string",
          "example": "4.5"
        },
        "comment": {
          "type": "string",
          "example": "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
        }
      }
    },
    "commentItem": {
      "type": "object",
      "properties": {
        "id": {
          "type": "number",
          "example": 1
        },
        "name": {
          "type": "string",
          "example": "شبکه 1"
        },
        "date": {
          "type": "string",
          "example": "TV_GLOBAL"
        },
        "avatar": {
          "type": "string",
          "example": "https://arashaltafi.ir/tvonline/images/png/ic_tv1.png"
        },
        "rating": {
          "type": "string",
          "example": "4.5"
        },
        "comment": {
          "type": "string",
          "example": "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
        }
      }
    },



    "profileNameResponse200": {
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
            "avatar": {
              "type": "string",
              "example": "https://arashaltafi.ir/arash.jpg"
            }
          }
        }
      }
    },
    "profileNameResponse400": {
      "type": "object",
      "properties": {
        "state": {
          "type": "string",
          "example": "err"
        },
        "message": {
          "type": "string",
          "example": "لطفا نام خود را به صورت متن وارد نمایید"
        }
      }
    },
    "profileNameResponse500": {
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
    "profileNameBody": {
      "type": "object",
      "required": [
        "name"
      ],
      "properties": {
        "name": {
          "type": "string",
          "example": "آرش الطافی"
        }
      }
    },



    "profileAvatarResponse200": {
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
            "avatar": {
              "type": "string",
              "example": "https://arashaltafi.ir/arash.jpg"
            }
          }
        }
      }
    },
    "profileAvatarResponse400": {
      "type": "object",
      "properties": {
        "state": {
          "type": "string",
          "example": "err"
        },
        "message": {
          "type": "string",
          "example": "لطفا عکس خود را ارسال نمایید"
        }
      }
    },
    "profileAvatarBody": {
      "type": "object",
      "required": [
        "image"
      ],
      "properties": {
        "image": {
          "type": "string",
          "example": "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh"
        }
      }
    },



    "allTvResponse200": {
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
            "BANNER": {
              "type": "array",
              "items": {
                "$ref": "#/models/allBannerItem"
              }
            },
            "TV_GLOBAL": {
              "type": "array",
              "items": {
                "$ref": "#/models/allTvItems"
              }
            },
            "TV_INTERNATIONAL": {
              "type": "array",
              "items": {
                "$ref": "#/models/allTvItems"
              }
            },
            "TV_EXCLUSIVE": {
              "type": "array",
              "items": {
                "$ref": "#/models/allTvItems"
              }
            },
            "TV_RADIO": {
              "type": "array",
              "items": {
                "$ref": "#/models/allTvItems"
              }
            },
            "TV_SATELLITE": {
              "type": "array",
              "items": {
                "$ref": "#/models/allTvItems"
              }
            },
            "TV_PROVINCIAL": {
              "type": "array",
              "items": {
                "$ref": "#/models/allTvItems"
              }
            }
          }
        }
      }
    },
    "tvResponse200": {
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
                "$ref": "#/models/tvItem"
              }
            }
          }
        }
      }
    },
    "tvResponse400": {
      "type": "object",
      "properties": {
        "state": {
          "type": "string",
          "example": "err"
        },
        "message": {
          "type": "string",
          "example": "لطفا مقادیر page_number و page_size را به صورت صحیح وارد نمایید"
        }
      }
    },
    "tvResponse401": {
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
    "tvResponse500": {
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
    "tvItem": {
      "type": "object",
      "properties": {
        "id": {
          "type": "number",
          "example": 3
        },
        "name": {
          "type": "string",
          "example": "شبکه 3"
        },
        "description": {
          "type": "string",
          "example": "شبکهٔ سه، یکی از شبکه‌های تلویزیونی دولتی کشور ایران است که در مجموعهٔ صدا و سیمای ایران مدیریت می‌شود. پخش برنامه‌های شبکه با فرمت HD 1080p و کدک HEVC نیز از گیرنده‌های زمینی و ماهواره‌ای از ۹ آذر ۱۳۹۹ آغاز شد. قبل از این پخش شبکه با فرمت HD 1080i و کدک H264 از ۱۷ مرداد ۱۳۹۵ آغاز شده‌ بود."
        },
        "image": {
          "type": "string",
          "example": "https://arashaltafi.ir/tvonline/images/png/ic_tv3.png"
        },
        "link": {
          "type": "string",
          "example": "https://cdn-bsht1c87.telewebion.com/tv3/live/720p/index.m3u8"
        },
        "isIran": {
          "type": "number",
          "example": 1
        }
      }
    },
    "allTvItems": {
      "type": "object",
      "properties": {
        "id": {
          "type": "number",
          "example": 3
        },
        "name": {
          "type": "string",
          "example": "شبکه 3"
        },
        "description": {
          "type": "string",
          "example": "شبکهٔ سه، یکی از شبکه‌های تلویزیونی دولتی کشور ایران است که در مجموعهٔ صدا و سیمای ایران مدیریت می‌شود. پخش برنامه‌های شبکه با فرمت HD 1080p و کدک HEVC نیز از گیرنده‌های زمینی و ماهواره‌ای از ۹ آذر ۱۳۹۹ آغاز شد. قبل از این پخش شبکه با فرمت HD 1080i و کدک H264 از ۱۷ مرداد ۱۳۹۵ آغاز شده‌ بود."
        },
        "image": {
          "type": "string",
          "example": "https://arashaltafi.ir/tvonline/images/png/ic_tv3.png"
        },
        "link": {
          "type": "string",
          "example": "https://cdn-bsht1c87.telewebion.com/tv3/live/720p/index.m3u8"
        },
        "state": {
          "type": "string",
          "example": "TV_GLOBAL"
        },
        "rating": {
          "type": "string",
          "example": "2.5"
        },
        "isIran": {
          "type": "number",
          "example": 1
        }
      }
    },
    "allBannerItem": {
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
        },
        "isVisible": {
          "type": "number",
          "example": 1
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