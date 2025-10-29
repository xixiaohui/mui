import {
  Box,
  Button,
  Container,
  IconButton,
  InputLabel,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { blue, green, red } from "@mui/material/colors";

import GitHubIcon from "@mui/icons-material/GitHub"
import TwitterIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

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
              <li>
                <a href="/test" className="hover:text-purple-600 transition">
                  测试页面
                </a>
              </li>
              <li>
                <a
                  href="/test/recharts"
                  className="hover:text-purple-600 transition"
                >
                  recharts测试页面
                </a>
              </li>
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

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      <Link color="text.secondary" href="/test">
        Compocore.AI
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}


function Footer() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: "center", md: "left" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            minWidth: { xs: "100%", sm: "60%" },
          }}
        >
          <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ fontWeight: 600, mt: 2 }}
            >
              提交邮箱
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
              订阅即可每周收到最新资讯。绝无垃圾邮件！
            </Typography>
            <InputLabel htmlFor="email-newsletter" sx={{ mb: 1 }}>
              邮箱
            </InputLabel>
            <Stack direction="row" spacing={2} useFlexGap>
              <TextField
                id="email-newsletter"
                hiddenLabel
                variant="outlined"
                fullWidth
                aria-label="请输入您的邮箱地址"
                placeholder="您的邮箱地址"
                slotProps={{
                  htmlInput: {
                    autoComplete: "off",
                    "aria-label": "请输入您的邮箱地址",
                  },
                }}
                sx={{
                  width: "250px",
                }}
              ></TextField>
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ flexShrink: 0 }}
              >
                提交
              </Button>
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: "medium" }}>
            所有页面
          </Typography>
          <Link href="/materials" color="textSecondary">
            所有材料
          </Link>
          <Link href="/suppliers" color="textSecondary">
            供应商
          </Link>
          <Link href="/categories" color="textSecondary">
            所有分类
          </Link>
          <Link href="/test" color="textSecondary">
            测试页面
          </Link>
          <Link href="/test/recharts" color="textSecondary">
            recharts测试页面
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            公司介绍
          </Typography>
          <Link color="text.secondary" variant="body2" href="#">
            关于我们
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            联系我们
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            法律条款
          </Typography>
          <Link color="text.secondary" variant="body2" href="#">
            政策
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            隐私条款
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            联系我们
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          display:'flex',
          justifyContent:'space-between',
          pt:{xs:4,sm:8},
          width:'100%',
          borderTop:'1px solid',
          borderColor:'divider'
        }}
      >
        <div>
          <Link color="text.secondary" variant="body2" href="#">
            隐私条款
          </Link>
          <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link color="text.secondary" variant="body2" href="#">
            服务条款
          </Link>
          <Copyright></Copyright>
        </div>
        <Stack direction='row'>
          <IconButton
            color="inherit"
            size="small"
            href="/test"
            aria-label="Github"
            sx={{ alignSelf:'center'}}
          >
            <GitHubIcon></GitHubIcon>
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="/test"
            aria-label="Github"
            sx={{ alignSelf:'center'}}
          >
            <LinkedInIcon></LinkedInIcon>
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="/test"
            aria-label="Github"
            sx={{ alignSelf:'center'}}
          >
            <TwitterIcon></TwitterIcon>
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}

export default Footer;
