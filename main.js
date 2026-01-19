// 等你实名过了，去 MemFire 后台创建项目，把这两个值换掉
const MEMFIRE_URL = "你的项目URL";
const MEMFIRE_KEY = "你的匿名密匙(anon key)";

// 初始化联网引擎
const supabase = window.supabase.createClient(MEMFIRE_URL, MEMFIRE_KEY);

// 1. 封面点击进入注册页
function enterApp() {
    const splash = document.getElementById('splash-screen');
    const auth = document.getElementById('auth-screen');
    splash.style.opacity = '0';
    setTimeout(() => {
        splash.style.display = 'none';
        auth.style.display = 'flex';
        setTimeout(() => { auth.style.opacity = '1'; }, 50);
    }, 800);
}

// 2. 真正的邮箱注册/登录
async function registerWithMemFire() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if(!email || !password) {
        alert("请填写完整的邮箱和密码");
        return;
    }

    // 尝试登录
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        // 如果登录失败，尝试注册
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (signUpError) {
            alert("错误：" + signUpError.message);
        } else {
            alert("注册成功！请去邮箱查收验证邮件（如果开启了验证）");
            goToMain();
        }
    } else {
        alert("欢迎回来！");
        goToMain();
    }
}

function goToMain() {
    document.getElementById('auth-screen').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('main-app').style.opacity = '1';
        fetchPlayers(); // 联网找人
    }, 800);
}

// 3. 找其他玩家 (实现“相互找到”)
async function fetchPlayers() {
    // 这里等你实名过了，我们在数据库里建个表，现在先打印一句话
    console.log("正在连接云端数据库...");
}