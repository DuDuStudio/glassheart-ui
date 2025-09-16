#!/bin/bash

# GlassHeartUI Cloud Run 部署腳本

# 設置變數
PROJECT_ID="${GCP_PROJECT_ID:-your-project-id}"  # 使用環境變數或預設值
SERVICE_NAME="glassheart-ui-storybook"
REGION="asia-east1"  # 或您偏好的區域
IMAGE_NAME="gcr.io/$PROJECT_ID/$SERVICE_NAME"

# 檢查 PROJECT_ID
if [ "$PROJECT_ID" = "your-project-id" ]; then
    echo "❌ 請設置 GCP_PROJECT_ID 環境變數或修改腳本中的 PROJECT_ID"
    echo "   例如: export GCP_PROJECT_ID=your-actual-project-id"
    exit 1
fi

echo "🚀 開始部署 GlassHeartUI Storybook 到 Cloud Run..."

# 檢查是否已登入 gcloud
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo "❌ 請先登入 gcloud: gcloud auth login"
    exit 1
fi

# 設置專案
echo "📋 設置 GCP 專案..."
gcloud config set project $PROJECT_ID

# 啟用必要的 API
echo "🔧 啟用必要的 API..."
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# 建置 Docker 映像
echo "🐳 建置 Docker 映像..."
gcloud builds submit --tag $IMAGE_NAME .

# 部署到 Cloud Run
echo "🚀 部署到 Cloud Run..."
gcloud run deploy $SERVICE_NAME \
    --image $IMAGE_NAME \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --port 8080 \
    --memory 512Mi \
    --cpu 1 \
    --max-instances 10 \
    --set-env-vars NODE_ENV=production

# 獲取服務 URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --platform managed --region $REGION --format 'value(status.url)')

echo "✅ 部署完成！"
echo "🌐 服務 URL: $SERVICE_URL"
echo "📖 您可以在瀏覽器中訪問: $SERVICE_URL"
