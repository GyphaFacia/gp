export const darkTheme = {
    themeName: 'darkTheme',
    
    $color1a: 'hsl(25, 5%, 10%)',
    $color1b: 'hsl(25, 5%, 15%)',
    $color1c: 'hsl(25, 5%, 20%)',

    $color2a: 'hsl(40, 100%, 90%)',
    $color2b: 'hsl(40, 30%, 70%)',
    $color2c: 'hsl(40, 10%, 50%)',
    
    $color3a: 'hsl(40, 100%, 50%)',
    $color3b: 'hsl(40, 50%, 50%)',
    
    $shadow1: '#000a',
    $shadow2: '#fff4',
    $shadow3: '#0001',
    
    $time1: '125ms',
    $time2: '250ms',
    $time3: '350ms',
}

export const desktopLayout = {
    $offset1: '5px',      $offset1r: '7px',
    $offset2: '10px',     $offset2r: '14px',
    $offset3: '16px',     $offset3r: '20px',
    $offset4: '24px',     $offset4r: '28px',
    $offset5: '32px',     $offset5r: '40px',
    $offset6: '48px',     $offset6r: '56px',
    $offset7: '64px',     $offset7r: '72px',
    $offset8: '80px',     $offset8r: '96px',
    $offset9: '100px',    $offset9r: '128px',
    
    $fontsize1: '12px',   $fontsize1r: '13px', 
    $fontsize2: '14px',   $fontsize2r: '15px', 
    $fontsize3: '16px',   $fontsize3r: '18px', 
    $fontsize4: '20px',   $fontsize4r: '22px', 
    $fontsize5: '24px',   $fontsize5r: '26px', 
    $fontsize6: '28px',   $fontsize6r: '30px', 
    $fontsize7: '32px',   $fontsize7r: '36px', 
    $fontsize8: '40px',   $fontsize8r: '46px', 
    $fontsize9: '50px',   $fontsize9r: '58px', 
}

export const mobileLayout = {
    $offset1: '3px',      $offset1r: '4px',
    $offset2: '5px',      $offset2r: '7px',
    $offset3: '10px',     $offset3r: '14px',
    $offset4: '16px',     $offset4r: '20px',
    $offset5: '24px',     $offset5r: '10px',
    $offset6: '32px',     $offset6r: '40px',
    $offset7: '48px',     $offset7r: '56px',
    $offset8: '64px',     $offset8r: '72px',
    $offset9: '80px',     $offset9r: '96px',
    
    $fontsize1: '10px',   $fontsize1r: '11px', 
    $fontsize2: '12px',   $fontsize2r: '13px', 
    $fontsize3: '14px',   $fontsize3r: '15px', 
    $fontsize4: '16px',   $fontsize4r: '18px', 
    $fontsize5: '20px',   $fontsize5r: '22px', 
    $fontsize6: '24px',   $fontsize6r: '26px', 
    $fontsize7: '28px',   $fontsize7r: '30px', 
    $fontsize8: '32px',   $fontsize8r: '36px', 
    $fontsize9: '40px',   $fontsize9r: '46px', 
}

export function setTheme(theme){
    const docStyle = document.documentElement.style
    Object.keys(theme).forEach(varName => {
        docStyle.setProperty(`--${varName.split('$').pop()}`, theme[varName])
    })
}

if(matchMedia('(max-width: 600px)').matches){
    setTheme(mobileLayout)
}
else{
    setTheme(desktopLayout)
}
setTheme(darkTheme)















