import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Link,
} from "@react-email/components";

interface SampleEmailProps {
  userFirstname?: string;
}

export const ContactMail = ({ userFirstname = "Zeno" }: SampleEmailProps) => (
  <Html>
    <Head />
    <Preview>Thank You for Reaching Out!.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
        >
          <svg
            style={{
              width: 30,
            }}
            viewBox="0 30 195 215"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMinYMin meet"
          >
            <path d="M178.496 124.737l-14.205-14.205 7.306-30.035-30.441 6.9-13.8-13.8 68.187-17.047-17.047 68.187z"></path>
            <path d="M154.956 218.901L33.192 97.138 101.38 80.09l13.8 13.8-48.706 12.176 27.6 27.6 32.064-7.712-8.117 31.658 27.6 27.6 12.176-48.705 14.205 14.206-17.046 68.187z"></path>
          </svg>
          BACHDEV
        </Text>
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Thank you for contacting me through my portfolio website. I appreciate
          you taking the time to reach out and I am excited to learn more about
          how I can assist you with your project.
        </Text>
        <Text style={paragraph}>
          I will review your message and get back to you as soon as possible,
          typically within 24-48 hours. If you have any urgent queries, please
          feel free to reply to this email or contact me directly
          <Link href="https://wa.me/+237698340664"> here</Link>.
        </Text>
        <Text style={paragraph}>Looking forward to connecting with you!</Text>
        <Text style={paragraph}>
          Best Regard,
          <br />
          BACHDEV
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          © {new Date().getFullYear()} Mohamed El Bachir |{" "}
          <Link href="https://www.bachdev.vercel.app">bachdev.vercel.app</Link>
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ContactMail;

export const SubscriptionMail = ({
  userFirstname = "Zeno",
}: SampleEmailProps) => (
  <Html>
    <Head />
    <Preview>Thank You for Reaching Out!.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
        >
          <svg
            style={{
              width: 30,
            }}
            viewBox="0 30 195 215"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMinYMin meet"
          >
            <path d="M178.496 124.737l-14.205-14.205 7.306-30.035-30.441 6.9-13.8-13.8 68.187-17.047-17.047 68.187z"></path>
            <path d="M154.956 218.901L33.192 97.138 101.38 80.09l13.8 13.8-48.706 12.176 27.6 27.6 32.064-7.712-8.117 31.658 27.6 27.6 12.176-48.705 14.205 14.206-17.046 68.187z"></path>
          </svg>
          BACHDEV
        </Text>
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Thank you for subscribing to my newsletter! I am excited to have you
          on board.
        </Text>
        <Text style={paragraph}>
          You can expect to receive the latest updates, news, and exclusive
          content directly to your inbox.
        </Text>
        <Text style={paragraph}>
          If you have any questions or feedback, feel free to reply to this
          email. I am always happy to hear from my subscribers.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href="https://www.bachdev.vercel.app/blog">
            see more in my blog
          </Button>
        </Section>
        <Text style={paragraph}>
          Best Regard,
          <br />
          BACHDEV
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          © {new Date().getFullYear()} Mohamed El Bachir |{" "}
          <Link href="https://www.bachdev.vercel.app">bachdev.vercel.app</Link>
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  backgroundImage:
    "linear-gradient(to right, rgba(203,213,225,0.2) 1px, transparent 1px),linear-gradient(to bottom, rgba(203,213,225,0.2) 1px, transparent 1px)",
  backgroundSize: "0.5rem 0.5rem",
  backgroundPosition: "center center",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  display: "inline-flex",
  height: "2.5rem",
  alignItems: "center",
  justifyContent: "center",
  whiteSpace: "nowrap",
  backgroundColor: "rgb(37, 99, 235)",
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
  fontWeight: 500,
  color: "white",
  transitionProperty:
    "color, background-color, border-color, text-decoration-color, fill, stroke",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "150ms",
  clipPath:
    "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
/*  <Section style={btnContainer}>
          <Button style={button} href="https://getkoala.com">
            Get started
          </Button>
        </Section>; */
