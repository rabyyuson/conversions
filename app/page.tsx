import Sidebar from '@/app/ui/sidebar';
import Main from '@/app/ui/main';
import Home from '@/app/ui/home';

export default function App() {
  return (
    <>
      <Sidebar/>
      <Main>
        <Home/>
      </Main>
    </>
  )
}
