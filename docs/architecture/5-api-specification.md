# 5. API Specification

## 5.1 REST API Specification

```yaml
openapi: 3.0.0
info:
  title: CNC加工厂ERP系统 API
  version: 1.0.0
  description: CNC加工厂ERP系统后端API规范
servers:
  - url: http://localhost:8080/api
    description: 开发环境服务器
security:
  - bearerAuth: []
paths:
  /auth/login:
    post:
      tags:
        - 认证
      summary: 用户登录
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                email:
                  type: string
                  format: email
                password:
                  type: string
              required:
                - email
                - password
      responses:
        '200':
          description: 登录成功
          content:
            application/json:
              schema:
                type: object
                properties:
                  accessToken:
                    type: string
                  refreshToken:
                    type: string
        '401':
          description: 认证失败

  /customers:
    get:
      tags:
        - 客户管理
      summary: 获取客户列表
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: pageSize
          in: query
          schema:
            type: integer
            default: 20
        - name: keyword
          in: query
          schema:
            type: string
      responses:
        '200':
          description: 成功
    post:
      tags:
        - 客户管理
      summary: 创建客户
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Customer'
      responses:
        '201':
          description: 创建成功

  /quotations:
    get:
      tags:
        - 报价管理
      summary: 获取报价单列表
      responses:
        '200':
          description: 成功
    post:
      tags:
        - 报价管理
      summary: 创建报价单
      responses:
        '201':
          description: 创建成功

  /work-orders:
    get:
      tags:
        - 生产管理
      summary: 获取工单列表
      responses:
        '200':
          description: 成功
    post:
      tags:
        - 生产管理
      summary: 创建工单
      responses:
        '201':
          description: 创建成功

  /workshop/start:
    post:
      tags:
        - 车间执行
      summary: 扫码开工
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                barcode:
                  type: string
                machineId:
                  type: string
              required:
                - barcode
                - machineId
      responses:
        '200':
          description: 开工成功

  /workshop/report:
    post:
      tags:
        - 车间执行
      summary: 扫码报工
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                barcode:
                  type: string
                quantity:
                  type: integer
                quality:
                  type: string
                  enum:
                    - ok
                    - rework
                    - scrap
              required:
                - barcode
                - quantity
      responses:
        '200':
          description: 报工成功

  /warehouse/stock-in:
    post:
      tags:
        - 仓储管理
      summary: 扫码入库
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                materialBarcode:
                  type: string
                quantity:
                  type: number
                locationCode:
                  type: string
      responses:
        '200':
          description: 入库成功

  /quality/iqc:
    post:
      tags:
        - 品质管理
      summary: 来料检验
      responses:
        '201':
          description: 检验成功

  /files/upload:
    post:
      tags:
        - 文件管理
      summary: 文件上传（MinIO）
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              type: object
              properties:
                file:
                  type: string
                  format: binary
                bucket:
                  type: string
                  description: 存储桶名称（drawings/attachments/temp）
      responses:
        '200':
          description: 上传成功
          content:
            application/json:
              schema:
                type: object
                properties:
                  fileId:
                    type: string
                  url:
                    type: string
                  size:
                    type: integer

  /files/{fileId}:
    get:
      tags:
        - 文件管理
      summary: 文件下载/预览
      parameters:
        - name: fileId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: 成功

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  schemas:
    Customer:
      type: object
      properties:
        id:
          type: string
        code:
          type: string
        name:
          type: string
        type:
          type: string
          enum:
            - potential
            - active
            - inactive
        industry:
          type: string
        creditLimit:
          type: number
```

---
