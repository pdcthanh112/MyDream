import AWS from 'aws-sdk';

// Cấu hình AWS SDK với thông tin xác thực của bạn
AWS.config.update({
  accessKeyId: 'YOUR_ACCESS_KEY',
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
  region: 'YOUR_BUCKET_REGION'
});

// Tạo đối tượng S3
const s3 = new AWS.S3();
