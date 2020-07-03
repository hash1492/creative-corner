<template>
  <div class="contact-us-component container">
    <div class="address">
      <img class="app-logo"  src="./../assets/default.png" alt="Mansi's Creative Corner">
      <p>Mansi Joshi</p>
      <p>M: +91 9662513350</p>
      <p>Email: mansiscreativecorner@gmail.com</p>
      <p>Vadodara, Gujarat, India</p>

      <div class="social">
        <a href="https://www.facebook.com/shop_with_mansi-538925183220808/">
          <img src="./../assets/facebook.png" alt="Facebook">
        </a>
        <a href="https://www.instagram.com/shop_with_mansi/">
          <img src="./../assets/instagram.png" alt="Instagram">
        </a>
        
      </div>
    </div>
      <div class="address-map">
        <iframe class="resp-iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29520.520726593808!2d73.18348109319435!3d22.351170975878453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xbfc8950b9ebe0862!2sAmbe+Residency!5e0!3m2!1sen!2sus!4v1554080535041!5m2!1sen!2sus" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
      </div>
  </div>
</template>
<style lang="scss">
.contact-us-component {
    margin-top: 80px;
    .app-logo {
      width: 300px;
      margin-bottom: 20px;
    }

    h3 {
      color: #eb2188;
    }

    .address {
      margin-bottom: 50px;
    }

    .address-map {
      position: relative;
      overflow: hidden;
      padding-top: 56.25%;
    }

    .resp-iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
  }

  .social {
    img {
      height: 50px;
      margin: 0 10px;
      transition: transform .2s;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
}
</style>
