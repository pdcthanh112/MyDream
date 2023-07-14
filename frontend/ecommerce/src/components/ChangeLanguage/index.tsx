import { Card, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Image from 'next/image';
import USFlag from '@assets/icons/us-flag.png';
import VNFlag from '@assets/icons/vn-flag.png';
import CNFlag from '@assets/icons/china-flag.png';
import ESFlag from '@assets/icons/spain-flag.png';

export default function ChangeLanguage() {
  return (
    <div className="relative inline-block group">
      <div className="hover:cursor-pointer">Co hien tai</div>
      <Card className="text-[#a4a4a4] text-sm hidden absolute transform -translate-x-2/3 p-4 w-[10rem] group-hover:block group-hover:z-50">
        <FormControl>
          <RadioGroup defaultValue="female" name="choose-language">
            <FormControlLabel
              value="en"
              control={<Radio size="small" />}
              label={
                <div className="flex items-center">
                  <Image src={USFlag} alt={''} width={25} />
                  <span className="ml-3">en-US</span>
                </div>
              }
            />
            <FormControlLabel
              value="vi"
              control={<Radio size="small" />}
              label={
                <div className="flex items-center">
                  <Image src={VNFlag} alt={''} width={25} />
                  <span className="ml-3">vi-VN</span>
                </div>
              }
            />
            <FormControlLabel
              value="zn"
              control={<Radio size="small" />}
              label={
                <div className="flex items-center">
                  <Image src={CNFlag} alt={''} width={25} />
                  <span className="ml-3">zh-CN</span>
                </div>
              }
            />
            <FormControlLabel
              value="es"
              control={<Radio size="small" />}
              label={
                <div className="flex items-center">
                  <Image src={ESFlag} alt={''} width={25} />
                  <span className="ml-3">es-ES</span>
                </div>
              }
            />
          </RadioGroup>
        </FormControl>
      </Card>
    </div>
  );
}
