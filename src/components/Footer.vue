<template>
    <footer class="l-footer footer">
      <div class="l-container">
        <div class="flex-footer">
          <div class="flex-footer__item">
            <div class="site-credits">
              <div class="site-credits__logo">
                <a href="#" class=""><img src="../assets/images/c-horse.svg" class="site-logo" alt="Site Logo" /></a>
              </div>
              <p>
                Lab/Researcher Contact Info<br>
                1234 Mrak Hall | One Shields Avenue<br>
                Davis, CA 95616<br>
                Phone: (530) 456-7890<br>
                Fax: (530) 123-4567<br>
                <a href="#">info@mydomain.ucdavis.edu</a>
              </p>
            </div>
          </div>
          <div class="flex-footer__item">
            <h2>Footer Menu</h2>
            <div class="footer-nav">
              <ul class="menu">
                <li class='nav-item'><a class='nav-link' @click="pageSelected='intro'">Intro</a></li>
                <li class='nav-item'><a class='nav-link' @click="pageSelected='models'">Models</a></li>
              </ul>
            </div>
          </div>
          <div class="flex-footer__item">
            <h2>Follow Us</h2>
            <div class="social-follow">
              <ul>
                <li><a class="social-follow__facebook" title="Facebook" href="#">Follow on Facebook</a></li>
                <li><a class="social-follow__twitter" title="Twitter" href="#">Follow on Twitter</a></li>
                <li><a class="social-follow__instagram" title="Instagram" href="#">Follow on Instagram</a></li>
                <li><a class="social-follow__youtube" title="YouTube" href="#">Follow on YouTube</a></li>
                <li><a class="social-follow__linkedin" title="LinkedIn" href="#">Follow on LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-spacer">
          <hr class="footer-spacer__hr hr-invert">
          <div class="footer-spacer__logo">
            <a href="https://www.ucdavis.edu/" class=""><img src="../assets/images/uc-logo-white.svg" class="ucd-logo" alt="UC Davis Logo" /></a>
          </div>
        </div>
        <div class="uc-footer">
          <p><a href="https://www.ucdavis.edu/">University of California, Davis</a>, One Shields Avenue, Davis, CA 95616 | 530-752-1011</p>
          <ul class="list--pipe">
            <li><a href="#">Help</a></li>
            <li><a href="#">Questions or comments?</a></li>
            <li><a href="#">Privacy & Accessibility</a></li>
            <li><a href="http://occr.ucdavis.edu/poc/">Principles of Community</a></li>
            <li><a href="http://www.universityofcalifornia.edu/">University of California</a></li>
            <li><a href="#">Sitemap</a></li>
            <li>Last update: August 6, 2020</li>
          </ul>
          <p>Copyright © The Regents of the University of California, Davis campus. All rights reserved.</p>
        </div>
      </div>
    </footer>
</template>

<script>
export default {
    data: function() {
        return {
            pageSelected: ''
        }
    },
    watch: {
        pageSelected: function() {
            this.$emit('pageWasChanged', this.pageSelected)
        }
    }
}
</script>

<style scoped>

</style>
