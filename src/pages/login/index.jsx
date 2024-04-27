import { useState, useMemo } from "react";
import Button from "@mui/material/Button";
import { UserApiInstance } from "@/api";
import { useMessage, useNavigateWithParams } from "@/hooks";
import { AuthUtils, RegexUtils } from "@/utils";

const Login = () => {
  const { goToUserDashboard } = useNavigateWithParams();
  const { showErrorMessage } = useMessage();
  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const disabled = useMemo(() => !email || !password, [email, password]);
  const canSubmit = useMemo(() => RegexUtils.isValidEmail(email), [email]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSubmit) {
      try {
        setLoading(true);
        const loginResp = await UserApiInstance.login({
          email,
          password,
        });
        if (loginResp && loginResp.code === 200 && loginResp.success) {
          let authInfo = { ...loginResp.data };
          let { user, access_token } = authInfo;
          AuthUtils.setToken(access_token);
          AuthUtils.setProfile(user);
          goToUserDashboard();
        }
      } finally {
        setLoading(false);
      }
    } else {
      showErrorMessage("The email address is invalid.");
    }
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <aside className=" bg-[#43598D] w-[400px] h-[400px] flex items-center justify-center rounded-12">
        {/* <img
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          alt=""
        /> */}
      </aside>
      <article className="ml-20">
        <h1 className="text-[24px] font-bold text-center">
          Continue with Email
        </h1>
        <div className="mt-[84px] space-y-6 flex flex-col">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            className="w-[440px] h-[60px] px-4 py-2 mt-1  caret-blue-500 bg-black-light border border-[#242832] 
                rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            className="w-[440px] h-[60px] px-4 py-2 mt-1  caret-blue-500 bg-black-light border border-[#242832]
                rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <Button
          onClick={handleSubmit}
          disabled={disabled}
          variant="contained"
          className="w-full !mt-[80px]"
          sx={{ borderRadius: "12px", height: "60px" }}
        >
          Continue
        </Button>
      </article>
    </main>
  );
};

export default Login;
