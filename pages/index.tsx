import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Text, Box } from "@chakra-ui/react";
import PageRoot from "../components/PageRoot";
import { useEffect } from "react";
import { useQuery, withGqless } from "../src/gqless";

const Home: NextPage = () => {
  const query = useQuery();
  const brands = query.brands();
  useEffect(() => {
    console.log("brands", brands[0].name);
  });
  return (
    <PageRoot>
      <Box
        d="flex"
        h="100%"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box className={styles.main}>
          <Text fontSize="6xl" color="brand.500">
            Fullstack{" "}
            <Text as="a" color="blue.400" href="https://nextjs.org">
              Next.js
            </Text>{" "}
            template
          </Text>

          <p className={styles.description}>
            Get started by editing{" "}
            <code className={styles.code}>pages/index.js</code>
          </p>
        </Box>

        <Box className={styles.footer}>
          <a
            href="https://getstayr.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.logo}>
              {/* <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> */}
            </span>{" "}
            Animal Farm
          </a>
        </Box>
      </Box>
    </PageRoot>
  );
};

export default withGqless(Home);
