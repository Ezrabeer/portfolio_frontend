import { Heading } from '@/components/typography';
import { Box } from '@/components/base';
import { asResponsiveArray } from '@/style/utils';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '@/store/slices/authSlice';
import Link from 'next/link';

export default function Home({ toggleTheme }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  function handleClick() {
    console.log('clicked');
    console.log({ email });
    console.log({ password });

    dispatch(
      login({
        email,
        password,
      })
    );
  }

  return (
    <Box
      mt={asResponsiveArray({
        _: '2rem',
        md: '5rem',
      })}
    >
      <Heading level={1}>
        <Box>My name is</Box> <Box>Ezra Berendsen</Box>
      </Heading>
      <p>And I develop software</p>
      <button onClick={toggleTheme}>HIIIII!!!!!</button>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleClick}>Login</button>

      <Link href="/login">Go to login page</Link>
    </Box>
  );
}
