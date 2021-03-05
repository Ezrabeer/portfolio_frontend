import { Heading } from '@/components/typography';
import { Box } from '@/components/base';
import { asResponsiveArray } from '@/style/utils';

export default function Home({ toggleTheme }) {
  return (
    <Box
      mt={asResponsiveArray({
        _: '2rem',
        md: '5rem',
      })}
    >
      <Heading level={5} fontSize={72}>
        Welkom
      </Heading>
      <button onClick={toggleTheme}>HIIIII!!!!!</button>
    </Box>
  );
}
