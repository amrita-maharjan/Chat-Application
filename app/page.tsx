import Image from "next/image";
import styles from "./page.module.css";

import LoginForm from "./login/page";
import ChatPage from "./chat/chatpage";

export default function Home() {
  return (
    <div className={styles.page}>
      <LoginForm />
    </div>
  );
}
