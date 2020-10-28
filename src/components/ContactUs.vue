<template>
  <div class="contact-us-component container">
    <div class="address">
      <img class="app-logo"  src="./../assets/default.png" alt="Mansi Creative Corner">
      
      <div class="contact-details">
        <p class="owner-name">Mansi Joshi</p>
        <p>+91 9662513350</p>
        <p>mansicreativecorner@gmail.com</p>
        <p>Vadodara, Gujarat, India</p>

        <div class="links">
          <!-- <div class="social">
            <p>Order Now</p>
            <a href="https://www.etsy.com/in-en/shop/MansiCreativeCorner" target="_blank">
              <img src="./../assets/etsy-logo.png" alt="Etsy">
            </a>
            <a href="https://www.flipkart.com/jewellery/pr?sid=mcr&q=Mansi+Creative+Corner&otracker=categorytree" target="_blank">
              <img src="./../assets/flipkart-logo.png" alt="Flipkart">
            </a>
          </div> -->

          <div class="social">
            <p>Follow Us</p>
            <a href="https://www.facebook.com/shop_with_mansi-538925183220808/" target="_blank">
              <img src="./../assets/facebook.png" alt="Facebook">
            </a>
            <a href="https://www.instagram.com/mansis_creative_corner/" target="_blank">
              <img src="./../assets/instagram.png" alt="Instagram">
            </a>
          </div>
        </div>
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

    .owner-name {
      font-size: 20px;
      font-weight: bold;
    }
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

    .contact-details {
      font-family: arial;
      text-align: left;
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
    margin-right: 30px;
    p {
      font-weight: bold;

    }
    img {
      height: 50px;
      margin-right: 15px;
      transition: transform .2s;
      &:hover {
        transform: scale(1.2);
      }
    }
  }

  .links {
    display: flex;
  }
}
</style>
