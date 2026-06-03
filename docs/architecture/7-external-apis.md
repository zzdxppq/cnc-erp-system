# 7. External APIs

## 7.1 ZBIntel ERP Integration (智邦ERP)

- **Purpose:** 与现有智邦ERP系统对接，实现数据同步
- **Documentation:** 待甲方提供接口规范
- **Base URL(s):** 待确认
- **Authentication:** 待确认
- **Rate Limits:** 待确认

**Key Endpoints Used:**
- 待确认

**Integration Notes:** 需要与现有智邦ERP并行运行，数据同步方案待细化。建议先实现单向数据同步（从智邦到本系统），后续按需扩展。

---

## 7.2 MinIO Object Storage

- **Purpose:** 图纸等文件存储，支持大文件和高可靠性
- **Documentation:** https://min.io/docs
- **Base URL(s):** http://localhost:9000 (本地开发)
- **Authentication:** Access Key + Secret Key
- **Rate Limits:** 无限制（受服务器硬件限制）

**Key Endpoints Used:**
- `PUT /{bucket}/{object}` - 文件上传
- `GET /{bucket}/{object}` - 文件下载
- `HEAD /{bucket}/{object}` - 获取文件元数据
- `DELETE /{bucket}/{object}` - 删除文件

**Integration Notes:**
- **存储桶策略:**
  - `drawings` - 客户图纸（PDF、CAD文件）
  - `attachments` - 附件文件
  - `temp` - 临时文件
- **文件大小限制:** 单文件最大5GB
- **纠删码模式:** 生产环境建议配置纠删码提高数据可靠性
- **S3兼容:** 使用AWS S3 SDK，配置endpoint为MinIO地址即可

**MinIO配置参数:**
```
MINIO_ENDPOINT=http://localhost:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET_DRAWINGS=drawings
MINIO_BUCKET_ATTACHMENTS=attachments
MINIO_BUCKET_TEMP=temp
```

---
