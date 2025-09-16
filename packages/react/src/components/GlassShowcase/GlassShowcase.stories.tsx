import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../Card/Card';
import { Button } from '../Button/Button';
import { Input, Textarea } from '../Input/Input';

const meta: Meta = {
  title: 'Showcase/Glass Effects',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FullShowcase: Story = {
  render: () => (
    <div className="min-h-screen p-8 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-white mb-6">
          GlassHeartUI
        </h1>
        <p className="text-2xl text-white/80 max-w-3xl mx-auto">
          現代化的 Liquid Glass UI 元件庫，讓您的應用程式擁有令人驚艷的玻璃效果
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="primary" size="lg" liquid>
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            開始使用
          </Button>
          <Button variant="outline" size="lg">
            查看文檔
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card liquid interactive size="lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              高性能動畫
            </CardTitle>
            <CardDescription>GPU 加速的流動動畫效果</CardDescription>
          </CardHeader>
          <CardContent>
            <p>採用最新的 CSS 技術，確保流暢的動畫表現，即使在低端設備上也能完美運行。</p>
          </CardContent>
          <CardFooter>
            <Button variant="primary" size="sm">了解更多</Button>
          </CardFooter>
        </Card>

        <Card liquid interactive size="lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
              高度可自定義
            </CardTitle>
            <CardDescription>靈活的參數調整系統</CardDescription>
          </CardHeader>
          <CardContent>
            <p>支援透明度、模糊程度、動畫速度、顏色等多項參數的自定義，滿足各種設計需求。</p>
          </CardContent>
          <CardFooter>
            <Button variant="accent" size="sm">開始自定義</Button>
          </CardFooter>
        </Card>

        <Card liquid interactive size="lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              多框架支援
            </CardTitle>
            <CardDescription>React、Vue、原生 JS</CardDescription>
          </CardHeader>
          <CardContent>
            <p>支援多種前端框架，包括 React、Vue、Svelte 以及原生 JavaScript，靈活適配各種專案。</p>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" size="sm">查看支援</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Interactive Demo */}
      <div className="max-w-4xl mx-auto">
        <Card size="xl" liquid>
          <CardHeader>
            <CardTitle className="text-center text-3xl">互動式演示</CardTitle>
            <CardDescription className="text-center text-lg">
              體驗不同玻璃強度的效果
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-center">輕度玻璃</h3>
                <Card glass="light" size="md">
                  <CardContent>
                    <p className="text-sm">適合需要保持內容清晰度的場景</p>
                  </CardContent>
                </Card>
                <Button glass="light" className="w-full">Light Button</Button>
                <Input glass="light" placeholder="Light input" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-center">中度玻璃</h3>
                <Card glass="medium" size="md">
                  <CardContent>
                    <p className="text-sm">平衡的透明度和模糊效果</p>
                  </CardContent>
                </Card>
                <Button glass="medium" className="w-full">Medium Button</Button>
                <Input glass="medium" placeholder="Medium input" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-center">重度玻璃</h3>
                <Card glass="heavy" size="md">
                  <CardContent>
                    <p className="text-sm">強烈的視覺衝擊效果</p>
                  </CardContent>
                </Card>
                <Button glass="heavy" className="w-full">Heavy Button</Button>
                <Input glass="heavy" placeholder="Heavy input" />
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-center">表單演示</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Input placeholder="姓名" />
                  <Input placeholder="電子郵件" type="email" />
                  <Input placeholder="電話號碼" />
                </div>
                <div className="space-y-4">
                  <Textarea placeholder="留言內容" rows={4} />
                  <div className="flex gap-2">
                    <Button variant="primary" className="flex-1">提交</Button>
                    <Button variant="outline" className="flex-1">重置</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-6">
        <h2 className="text-4xl font-bold text-white">準備開始了嗎？</h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          立即開始使用 GlassHeartUI，為您的專案添加令人驚艷的玻璃效果
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="primary" size="xl" liquid>
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            查看文檔
          </Button>
          <Button variant="outline" size="xl">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            GitHub
          </Button>
        </div>
      </div>
    </div>
  ),
};
