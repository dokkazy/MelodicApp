import LoginDialog from "@/app/components/AuthDialog/LoginDialog";

export default function LoginPage() {
  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="md:min-w-[425px]">
        {" "}
        <LoginDialog />
      </div>
    </div>
  );
}
