function FooterMaterial() {
  return (
    <>
      {/* 页脚 */}
      <footer className="bg-gray-50 mt-20 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 公司信息 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Compocore
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              AI 智能选材，让决策更高效
            </p>
          </div>

          {/* 导航模块 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              页面导航
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="/dashboard" className="hover:text-blue-600 transition">
                  仪表盘
                </a>
              </li>
              <li>
                <a href="/materials" className="hover:text-blue-600 transition">
                  所有材料
                </a>
              </li>
              <li>
                <a href="/suppliers" className="hover:text-cyan-600 transition">
                  供应商
                </a>
              </li>
              <li>
                <a
                  href="/categories"
                  className="hover:text-teal-600 transition"
                >
                  分类导航
                </a>
              </li>
              {/* <li>
                <a
                  href="/featured"
                  className="hover:text-purple-600 transition"
                >
                  精选材料
                </a>
              </li> */}
            </ul>
          </div>

          {/* 联系信息 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              联系我们
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Email: support@compocore.com</li>
              <li>电话: +86 123 4567 890</li>
              <li>地址: 中国 上海市</li>
            </ul>
          </div>

          {/* 社交媒体 / 其他 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              关注我们
            </h4>
            <div className="flex space-x-4 mt-2">
              <a
                href="#"
                className="text-gray-500 hover:text-blue-500 transition"
              >
                🐦
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-blue-700 transition"
              >
                💼
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-pink-500 transition"
              >
                📸
              </a>
            </div>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="text-center text-sm text-gray-400 mt-6">
          © 2025 Compocore.com · AI 智能选材，让决策更高效
        </div>
      </footer>
    </>
  );
}

export default  FooterMaterial;