# 15. Security and Performance

## 15.1 Security Requirements

**Frontend Security:**
- CSP Headers: `default-src 'self'; script-src 'self'`
- XSS Prevention: 输入校验 + 输出转义
- Secure Storage: Token存储在memory，避免localStorage XSS

**Backend Security:**
- Input Validation: Hibernate Validator + 自定义校验注解
- Rate Limiting: Spring Cloud Gateway全局限流
- CORS Policy: 只允许白名单域名

**Authentication Security:**
- Token Storage: Access Token 15min + Refresh Token 7 days
- Session Management: Redis存储Session，支持集群部署
- Password Policy: 8-32位，必须包含大小写字母和数字

**MinIO Security:**
- Access Key/Secret Key: 强密码策略，定期轮换
- Bucket Policy: 按业务划分存储桶，最小权限原则
- Network: 仅内网访问，不暴露公网
- TLS: 生产环境必须启用HTTPS

## 15.2 Performance Optimization

**Frontend Performance:**
- Bundle Size Target: < 500KB (首屏)
- Loading Strategy: Code Splitting + Lazy Loading
- Caching Strategy: Service Worker缓存静态资源

**Backend Performance:**
- Response Time Target: < 2s (普通查询), < 10s (复杂报表)
- Database Optimization: 合理索引 + SQL优化
- Caching Strategy: Redis缓存热点数据

**MinIO Performance:**
- 单文件最大: 5GB
- 建议文件大小: < 100MB（图纸预览优化）
- 并发上传: 支持断点续传

---
