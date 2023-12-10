import Sidebar from '@/app/ui/sidebar';
import Main from '@/app/ui/main';

export default function Home() {
  return (
    <>
      <Sidebar/>
      <Main>
        <h1 className='text-2xl font-bold mb-4'>Home</h1>
        <p>
            This is the content area where your page content will go.
            Customize it according to your needs.
        </p>
      </Main>
    </>
  )
}
