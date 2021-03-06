/* global $, angular, React */
import React from 'react';
import DocumentMeta from 'react-document-meta';
import Scroll from 'react-scroll-to-element';
/*import cookie from 'react-cookie';*/
import './App.css';

const lang = require('./lang');


 /* Load meta tags */
  const meta = {
      title: lang.home_meta_title,
      description: lang.home_meta_title,
      meta: {
        name: {
          keywords: lang.home_meta_title
        }
      }
    };
 
class Home extends React.Component {
 
  constructor(props) {
  
 
       super(props);
	   /* Declare state */
	   this.state = { categorylist: [],categoryclass:''};
	 
	   
   }

	 componentWillMount() {
		
		
		
		
			
			
	 }
	  componentDidMount() {
		
	  }
	  
	  
 check(e){
    
    var elmnt = e.currentTarget.dataset.id;
    var elmnts = document.getElementById(elmnt);
    elmnts.scrollIntoView(true);
   
 }

 


 
  

  render() {
   
    return (

	<div>   	<DocumentMeta  {...meta} />
	
  <nav className="navbar navbar-default" role="navigation">
    <div className="container">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
          <span className="sr-only">Toggle nav</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>

      
        <a className="navbar-brand" href="#">ECCS</a>

      </div>
      <div className="navigation collapse navbar-collapse navbar-ex1-collapse">
        <ul className="nav navbar-nav">
          <li className="current"><a onClick={this.check.bind(this)} data-id="intro" >Home</a></li>
          <li><a onClick={this.check.bind(this)} data-id="about" >About</a></li>
          <li><a onClick={this.check.bind(this)} data-id="services"   >Service</a></li>
          <li><a onClick={this.check.bind(this)} data-id="portfolio"  >Works</a></li>
          <li><a onClick={this.check.bind(this)} data-id="team" >Team</a></li>
          <li><a onClick={this.check.bind(this)} data-id="contact"  >Contact</a></li>
        </ul>
      </div>
    </div>
  </nav>

 
  <div id="intro">
    <div className="intro-text">
      <div className="container">
        <div className="col-md-12">
          <div id="rotator">
            <h1><span className="1strotate">ECCS web studio, Design for life, Creativity and technology</span></h1>
            <div className="line-spacer"></div>
            <p><span className="2ndrotate">Web Design, Brand Identity, Promotion</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>

  
  <section id="about" className="home-section bg-white">
    <div className="container">
      <div className="row">
        <div className="col-md-offset-2 col-md-8">
          <div className="section-heading">
            <h2>About us</h2>
            <div className="heading-line"></div>
            <p>We’ve been building unique digital products, platforms, and experiences for the past 6 years.</p>
          </div>
        </div>
      </div>
      <div className="row wow fadeInUp">
        <div className="col-md-6 about-img">
          <img src="img/about-img.jpg" alt=""/>
        </div>

        <div className="col-md-6 content">
          <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elite storium paralate</h2>
          <h3>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h3>
          <p>
            Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Libero justo laoreet sit amet cursus sit amet dictum sit. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          </p>
        </div>
      </div>
    </div>
  </section>

  
  <section id="parallax1" className="home-section parallax" data-stellar-background-ratio="0.5">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="color-light">
            <h2 className="wow bounceInDown" data-wow-delay="0.5s">Details are the key for perfection</h2>
            <p className="lead wow bounceInUp" data-wow-delay="1s">We mix all detailed things together</p>
          </div>
        </div>
      </div>
    </div>
  </section>

 
  <section id="services" className="home-section bg-white">
    <div className="container">
      <div className="row">
        <div className="col-md-offset-2 col-md-8">
          <div className="section-heading">
            <h2>Services</h2>
            <div className="heading-line"></div>
            <p>We’ve been building unique digital products, platforms, and experiences for the past 6 years.</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div id="carousel-service" className="service carousel slide">

          
            <div className="carousel-inner">
              <div className="item active">
                <div className="row">
                  <div className="col-sm-12 col-md-offset-1 col-md-6">
                    <div className="wow bounceInLeft">
                      <h4>Website Design</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-5">
                    <div className="screenshot wow bounceInRight">
                      <img src="img/screenshots/1.png" className="img-responsive" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="row">
                  <div className="col-sm-12 col-md-offset-1 col-md-6">
                    <div className="wow bounceInLeft">
                      <h4>Brand Identity</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-5">
                    <div className="screenshot wow bounceInRight">
                      <img src="img/screenshots/2.png" className="img-responsive" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="row">
                  <div className="col-sm-12 col-md-offset-1 col-md-6">
                    <div className="wow bounceInLeft">
                      <h4>Web & Mobile Apps</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-5">
                    <div className="screenshot wow bounceInRight">
                      <img src="img/screenshots/3.png" className="img-responsive" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
            <ol className="carousel-indicators">
              <li data-target="#carousel-service" data-slide-to="0" className="active"></li>
              <li data-target="#carousel-service" data-slide-to="1"></li>
              <li data-target="#carousel-service" data-slide-to="2"></li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </section>

  
  <section id="portfolio" className="home-section bg-gray">
    <div className="container">
      <div className="row">
        <div className="col-md-offset-2 col-md-8">
          <div className="section-heading">
            <h2>Works</h2>
            <div className="heading-line"></div>
            <p>We’ve been building unique digital products, platforms, and experiences for the past 6 years.</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">

          <ul id="og-grid" className="og-grid">
            <li>
              <a href="#" data-largesrc="img/works/1.jpg" data-title="Portfolio title" data-description="Duo te dico volutpat, unum elit oblique per id. Ne duo mollis sapientem intellegebat. Per at augue vidisse percipit, pri vocibus assueverit interesset ut, no dolore luptatum incorrupte nec. In mentitum forensibus nec, nibh eripuit ut pri, tale illud voluptatum ut sea. Sed oratio repudiare ei, cum an magna labitur, eu atqui augue mei. Pri consul detracto eu, solet nusquam accusam ex vim, an movet interesset necessitatibus mea.">
								<img src="img/works/thumbs/1.jpg" alt=""/>
							</a>
            </li>
            <li>
              <a href="#" data-largesrc="img/works/2.jpg" data-title="Portfolio title" data-description="Mea an eros periculis dignissim, quo mollis nostrum elaboraret et. Id quem perfecto mel, no etiam perfecto qui. No nisl legere recusabo nam, ius an tale pericula evertitur, dicat phaedrum qui in. Usu numquam legendos in, voluptaria sadipscing ut vel. Eu eum mandamus volutpat gubergren, eos ad detracto nominati, ne eum idque elitr aliquam.">
								<img src="img/works/thumbs/2.jpg" alt=""/>
							</a>
            </li>
            <li>
              <a href="#" data-largesrc="img/works/3.jpg" data-title="Portfolio title" data-description="Vim ad persecuti appellantur. Eam ignota deterruisset eu, in omnis fierent convenire sed. Ne nulla veritus vel, liber euripidis in eos. Postea comprehensam vis in, detracto deseruisse mei ea. Ex sadipscing deterruisset concludaturque quo.">
								<img src="img/works/thumbs/3.jpg" alt="img01"/>
							</a>
            </li>
            <li>
              <a href="#" data-largesrc="img/works/4.jpg" data-title="Portfolio title" data-description="In mentitum forensibus nec, nibh eripuit ut pri, tale illud voluptatum ut sea. Sed oratio repudiare ei, cum an magna labitur, eu atqui augue mei. Pri consul detracto eu, solet nusquam accusam ex vim, an movet interesset necessitatibus mea.">
								<img src="img/works/thumbs/4.jpg" alt="img01"/>
							</a>
            </li>
            <li>
              <a href="#" data-largesrc="img/works/5.jpg" data-title="Portfolio title" data-description="Duo te dico volutpat, unum elit oblique per id. Ne duo mollis sapientem intellegebat. Per at augue vidisse percipit, pri vocibus assueverit interesset ut, no dolore luptatum incorrupte nec. In mentitum forensibus nec, nibh eripuit ut pri, tale illud voluptatum ut sea">
								<img src="img/works/thumbs/5.jpg" alt="img01"/>
							</a>
            </li>
            <li>
              <a href="#" data-largesrc="img/works/6.jpg" data-title="Portfolio title" data-description="Id elit saepe pro. In atomorum constituam definitionem quo, at torquatos sadipscing eum, ut eum wisi meis mentitum. Probo feugiat ea duo. An usu platonem instructior, qui dolores inciderint ad. Te elit essent mea, vim ne atqui legimus invenire, ad dolor vitae sea.">
								<img src="img/works/thumbs/6.jpg" alt="img01"/>
							</a>
            </li>
            <li>
              <a href="#" data-largesrc="img/works/7.jpg" data-title="Portfolio title" data-description="Duo te dico volutpat, unum elit oblique per id. Ne duo mollis sapientem intellegebat. Per at augue vidisse percipit, pri vocibus assueverit interesset ut, no dolore luptatum incorrupte nec. In mentitum forensibus nec, nibh eripuit ut pri, tale illud voluptatum ut sea. Sed oratio repudiare ei, cum an magna labitur, eu atqui augue mei.">
								<img src="img/works/thumbs/7.jpg" alt="img01"/>
							</a>
            </li>
            <li>
              <a href="#" data-largesrc="img/works/8.jpg" data-title="Portfolio title" data-description="No nisl legere recusabo nam, ius an tale pericula evertitur, dicat phaedrum qui in. Usu numquam legendos in, voluptaria sadipscing ut vel. Eu eum mandamus volutpat gubergren, eos ad detracto nominati, ne eum idque elitr aliquam.">
								<img src="img/works/thumbs/8.jpg" alt="img01"/>
							</a>
            </li>
            <li>
              <a href="#" data-largesrc="img/works/9.jpg" data-title="Portfolio title" data-description="Lorem ipsum dolor sit amet, ex pri quod ferri fastidii. Mazim philosophia eum ad, facilisis laboramus te est. Eam magna fabellas ut. Ne vis diceret accumsan salutandi, pro in impedit accusamus dissentias, ut nonumy eloquentiam ius.">
								<img src="img/works/thumbs/9.jpg" alt="img01"/>
							</a>
            </li>
            <li>
              <a href="#" data-largesrc="img/works/10.jpg" data-title="Portfolio title" data-description="Duo te dico volutpat, unum elit oblique per id. Ne duo mollis sapientem intellegebat. Per at augue vidisse percipit, pri vocibus assueverit interesset ut, no dolore luptatum incorrupte nec. In mentitum forensibus nec, nibh eripuit ut pri, tale illud voluptatum ut sea. Sed oratio repudiare ei, cum an magna labitur, eu atqui augue mei. Pri consul detracto eu, solet nusquam accusam ex vim.">
								<img src="img/works/thumbs/10.jpg" alt="img01"/>
							</a>
            </li>
            <li>
              <a href="#" data-largesrc="img/works/11.jpg" data-title="Portfolio title" data-description="Vim ad persecuti appellantur. Eam ignota deterruisset eu, in omnis fierent convenire sed. Ne nulla veritus vel, liber euripidis in eos. Postea comprehensam vis in, detracto deseruisse mei ea. Ex sadipscing deterruisset concludaturque quo.">
								<img src="img/works/thumbs/11.jpg" alt="img01"/>
							</a>
            </li>
            <li>
              <a href="#" data-largesrc="img/works/12.jpg" data-title="Portfolio title" data-description="Mea an eros periculis dignissim, quo mollis nostrum elaboraret et. Id quem perfecto mel, no etiam perfecto qui. No nisl legere recusabo nam, ius an tale pericula evertitur, dicat phaedrum qui in. Usu numquam legendos in, voluptaria sadipscing ut vel. Eu eum mandamus volutpat gubergren, eos ad detracto nominati, ne eum idque elitr aliquam.">
								<img src="img/works/thumbs/12.jpg" alt="img01"/>
							</a>
            </li>
          </ul>

        </div>
      </div>
    </div>
  </section>


  <section id="parallax2" className="home-section parallax" data-stellar-background-ratio="0.5">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <ul className="clients">
            <li className="wow fadeInDown" data-wow-delay="0.3s"><a href="#"><img src="img/clients/1.png" alt="" /></a></li>
            <li className="wow fadeInDown" data-wow-delay="0.6s"><a href="#"><img src="img/clients/2.png" alt="" /></a></li>
            <li className="wow fadeInDown" data-wow-delay="0.9s"><a href="#"><img src="img/clients/3.png" alt="" /></a></li>
            <li className="wow fadeInDown" data-wow-delay="1.1s"><a href="#"><img src="img/clients/4.png" alt="" /></a></li>
          </ul>
        </div>
      </div>
    </div>
  </section>

 
  <section id="team" className="home-section bg-white">
    <div className="container">
      <div className="row">
        <div className="col-md-offset-2 col-md-8">
          <div className="section-heading">
            <h2>Our Team</h2>
            <div className="heading-line"></div>
            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
          <div className="box-team wow bounceInUp" data-wow-delay="0.1s">
            <img src="img/team/1.jpg" alt="" className="img-circle img-responsive" />
            <h4>Dominique Vroslav</h4>
            <p>Art Director</p>
          </div>
        </div>
        <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3" data-wow-delay="0.3s">
          <div className="box-team wow bounceInUp">
            <img src="img/team/2.jpg" alt="" className="img-circle img-responsive" />
            <h4>Thomas Jeffersonn</h4>
            <p>Web Designer</p>
          </div>
        </div>
        <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3" data-wow-delay="0.5s">
          <div className="box-team wow bounceInUp">
            <img src="img/team/3.jpg" alt="" className="img-circle img-responsive" />
            <h4>Nola Maurin</h4>
            <p>Illustrator</p>
          </div>
        </div>
        <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3" data-wow-delay="0.7s">
          <div className="box-team wow bounceInUp">
            <img src="img/team/4.jpg" alt="" className="img-circle img-responsive" />
            <h4>Mira Ladovic</h4>
            <p>Typographer</p>
          </div>
        </div>
      </div>
    </div>
  </section>

 
  <section id="contact" className="home-section bg-gray">
    <div className="container">
      <div className="row">
        <div className="col-md-offset-2 col-md-8">
          <div className="section-heading">
            <h2>Contact us</h2>
            <div className="heading-line"></div>
            <p>If you have any question or just want to say 'hello' to Alstar web studio please fill out form below and we will be get in touch with you within 24 hours. </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-offset-2 col-md-8">
          <div id="sendmessage">Your message has been sent. Thank you!</div>
          <div id="errormessage"></div>

          <form action="" method="post" className="form-horizontal contactForm" role="form">
            <div className="col-md-offset-2 col-md-8">
              <div className="form-group">
                <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                <div className="validation"></div>
              </div>
            </div>

            <div className="col-md-offset-2 col-md-8">
              <div className="form-group">
                <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                <div className="validation"></div>
              </div>
            </div>

            <div className="col-md-offset-2 col-md-8">
              <div className="form-group">
                <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
                <div className="validation"></div>
              </div>
            </div>
            <div className="col-md-offset-2 col-md-8">
              <div className="form-group">
                <textarea className="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
                <div className="validation"></div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-offset-2 col-md-8">
                <button type="submit" className="btn btn-theme btn-lg btn-block">Send message</button>
              </div>
            </div>
          </form>

        </div>
      </div>

    </div>
  </section>

 
  <section id="bottom-widget" className="home-section bg-white">
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="contact-widget wow bounceInLeft">
            <i className="fa fa-map-marker fa-4x"></i>
            <h5>Main Office</h5>
            <p>
              109 Borough High Street,<br />London SE1 1NL
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="contact-widget wow bounceInUp">
            <i className="fa fa-phone fa-4x"></i>
            <h5>Call</h5>
            <p>
              +1 111 9998 7774<br></br> +1 245 4544 6855

            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="contact-widget wow bounceInRight">
            <i className="fa fa-envelope fa-4x"></i>
            <h5>Email us</h5>
            <p>
              hello@alstarstudio.com<br />sales@alstarstudio.com
            </p>
          </div>
        </div>
      </div>
      <div className="row mar-top30">
        <div className="col-md-12">
          <h5>We're on social networks</h5>
          <ul className="social-network">
            <li><a href="#">
						<span className="fa-stack fa-2x">
							<i className="fa fa-circle fa-stack-2x"></i>
							<i className="fa fa-facebook fa-stack-1x fa-inverse"></i>
						</span></a>
            </li>
            <li><a href="#">
						<span className="fa-stack fa-2x">
							<i className="fa fa-circle fa-stack-2x"></i>
							<i className="fa fa-dribbble fa-stack-1x fa-inverse"></i>
						</span></a>
            </li>
            <li><a href="#">
						<span className="fa-stack fa-2x">
							<i className="fa fa-circle fa-stack-2x"></i>
							<i className="fa fa-twitter fa-stack-1x fa-inverse"></i>
						</span></a>
            </li>
            <li><a href="#">
						<span className="fa-stack fa-2x">
							<i className="fa fa-circle fa-stack-2x"></i>
							<i className="fa fa-pinterest fa-stack-1x fa-inverse"></i>
						</span></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

 
  <footer>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <p>Copyright &copy; ECCS. All rights reserved.</p>
          <div className="credits">
          
             
             
            Designed by <a href="https://www.eclick.ae/">Eclick</a>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <a href="#" className="back-to-top"><i className="fa fa-chevron-up"></i></a>
	</div>
    );
  }
}
export default Home;
