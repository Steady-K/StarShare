import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignInWithPassword } from "@/hooks/mutations/use-sign-in-with-password";
import { useState } from "react";
import { Link } from "react-router";
import gitHubLogo from "@/assets/github-mark.svg";
import { useSignInWithOAuth } from "@/hooks/mutations/use-sign-in-with-oauth";
import kakaoLogo from "@/assets/kakaotalk_sharing_btn_medium_ov.png";
import googleLogo from "@/assets/google-logo.svg";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signInWithPassword } = useSignInWithPassword();
  const { mutate: signInWithOAuth } = useSignInWithOAuth();

  const handleSignInWithPasswordClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signInWithPassword({
      email,
      password,
    });
  };

  const handleSignInWithGitHubClick = () => {
    signInWithOAuth("github");
  };

  const handleSignInWithGoogleClick = () => {
    signInWithOAuth("google");
  };

  const handleSignInWithKakaoClick = () => {
    signInWithOAuth("kakao");
  };
  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">로그인</div>
      <div className="flex flex-col gap-2">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="py-6"
          type="email"
          placeholder="example@abc.com"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="py-6"
          type="password"
          placeholder="password"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button onClick={handleSignInWithPasswordClick} className="w-full">
          로그인
        </Button>
        <Button
          onClick={handleSignInWithKakaoClick}
          className="w-full bg-[#FEE500] hover:bg-[#FEE800]"
          variant={"outline"}
        >
          <img className="h-4 w-4" src={kakaoLogo} />
          kakao 계정으로 로그인
        </Button>
        <Button
          onClick={handleSignInWithGoogleClick}
          className="w-full"
          variant={"outline"}
        >
          <img className="h-4 w-4" src={googleLogo} />
          Google 계정으로 로그인
        </Button>
        <Button
          onClick={handleSignInWithGitHubClick}
          className="w-full"
          variant={"outline"}
        >
          <img className="h-4 w-4" src={gitHubLogo} />
          Github 계정으로 로그인
        </Button>
      </div>
      <div>
        <Link className="text-muted-foreground hover:underline" to={"/sign-up"}>
          계정이 없으시다면? 회원가입
        </Link>
      </div>
    </div>
  );
}
