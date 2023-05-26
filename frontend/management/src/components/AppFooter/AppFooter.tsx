import AppLogo from "@assets/images/app-logo.png";
import FacebookIcon from "@assets/icons/facebook-icon.svg";
import TwitterIcon from "@assets/icons/twitter-icon.svg";
import LinkedInIcon from "@assets/icons/linkedin-icon.svg";
import InstagramIcon from "@assets/icons/instagram-icon.svg";
import YoutubeIcon from "@assets/icons/youtube-icon.svg";
import GitHubIcon from "@assets/icons/github-icon.svg";

import LocationIcon from "@assets/icons/location-icon.svg";
import PhoneIcon from "@assets/icons/phone-icon.svg";
import WebsiteIcon from "@assets/icons/website-icon.svg";
import EmailIcon from "@assets/icons/email-icon.svg";

import styled from "styled-components";

const Footer = () => {
  const TextStyle = styled.p`
    font-family: Montserrat, Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 14px;
    font-style: normal;
    line-height: 28px;
    color: #626d79;
    text-transform: none;
  `;

  return (
    <div className="inline-flex px-5 py-3 bg-[rgba(20,177,231,.1)]">
      <div className="w-[40%]">
        <TextStyle className="px-16">
          DreamHigh is a Cong Thanh's personal project, including an e-commerce site, official website, employee management page and administrator's site.
          Specific description at &nbsp;
          <a href="https://github.com/pdcthanh112/MyDream.git" className="underline">GitHub</a>
        </TextStyle>
        <div className="flex justify-center">
          <img src={AppLogo} alt="App logo" width={"30%"} height={"auto"} className="flex justify-center" />
        </div>
        <div className="flex justify-center">Connect to me</div>
        <div className="w-full inline-flex justify-center">
          <a href="https://www.facebook.com/pdcthanh112/">
            <img src={FacebookIcon} alt="Facebook icon" width={"30rem"} height={"auto"} className="mx-2" />
          </a>
          <a href="https://www.linkedin.com/in/pdcthanh112dev/">
            <img src={LinkedInIcon} alt="LinkedIn icon" width={"30rem"} height={"auto"} className="mx-2" />
          </a>
          <a href="https://www.linkedin.com/in/pdcthanh112dev/">
            <img src={TwitterIcon} alt="Twitter icon" width={"30rem"} height={"auto"} className="mx-2" />
          </a>
          <a href="https://www.linkedin.com/in/pdcthanh112dev/">
            <img src={InstagramIcon} alt="Instagram icon" width={"30rem"} height={"auto"} className="mx-2" />
          </a>
          <a href="https://www.linkedin.com/in/pdcthanh112dev/">
            <img src={YoutubeIcon} alt="Youtube icon" width={"30rem"} height={"auto"} className="mx-2" />
          </a>
          <a href="https://github.com/pdcthanh112/">
            <img src={GitHubIcon} alt="Youtube icon" width={"30rem"} height={"auto"} className="mx-2" />
          </a>
        </div>
        <div className="flex justify-center">&copy;2023 by pdcthanh</div>
      </div>
      <div className="w-[15%]">
        <ul className="text-[#626d79]">
          <li>Spring framework</li>
          <li>NodeJS Express</li>
          <li>PostgreSQL</li>
          <li>MySQL</li>
          <li>MongoDB</li>
          <li>Redis</li>
          <li>Elasticsearch</li>
        </ul>
      </div>
      <div className="w-[15%]">
        <ul className="text-[#626d79]">
          <li>React</li>
          <li>NextJS</li>
          <li>Angular</li>
          <li>Vue</li>
          <li>Flutter</li>
          <li>AWS</li>
          <li>Firebase</li>
        </ul>
      </div>
      <div className="w-[30%]">
        <div className="flex py-2">
          <img src={LocationIcon} alt="Location icon" width={"24rem"} height={"auto"} />
          <TextStyle className="ml-2">285 CMT8 Street, Ward 12, District 10, Ho Chi Minh City</TextStyle>
        </div>
        <div className="flex py-2">
          <img src={PhoneIcon} alt="Phone icon" width={"24rem"} height={"auto"} />
          <TextStyle className="ml-2">0382-722-849</TextStyle>
        </div>
        <div className="flex py-2">
          <img src={WebsiteIcon} alt="Website icon" width={"24rem"} height={"auto"} />
          <TextStyle className="ml-2">mydream.com.vn</TextStyle>
        </div>
        <div className="flex py-2">
          <img src={EmailIcon} alt="Email icon" width={"24rem"} height={"auto"} />
          <TextStyle className="ml-2">pdcthanh112.dev@gmail.com</TextStyle>
        </div>
      </div>
    </div>
  );
};

export default Footer;
