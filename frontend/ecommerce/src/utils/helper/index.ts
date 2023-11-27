import GoogleLoginImage from '@assets/images/login-google-image.png';
import FacebookLoginImage from '@assets/images/login-facebook-image.png';
import TwitterLoginImage from '@assets/images/login-twitter-image.png';
import AppleLoginImage from '@assets/images/login-apple-image.png';

export const roundNumber = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
};

// export const roundNumber = (value: number) => {
//   if (value > 1000) {
//     const roundedValue = Math.round(value / 100) / 10;
//     return `${roundedValue}k`;
//   } else {
//     return value.toString();
//   }
// };

export const getAuthLogo = (name: string) => {
  switch (name) {
    case 'google':
      return { img: GoogleLoginImage, bgColor: '#3b82f6', iconBg: '#fff' };
    case 'facebook':
      return { img: FacebookLoginImage, bgColor: '#1977d2', iconBg: '#1977d2' };
    case 'twitter':
      return { img: TwitterLoginImage, bgColor: '#04a9f3', iconBg: '#04a9f3' };
    case 'apple':
      return { img: AppleLoginImage, bgColor: '#878787', iconBg: '#878787' };
    default:
      return { img: '', bgColor: '#fdafdsa', iconBg: '#fff' };
  }
};
