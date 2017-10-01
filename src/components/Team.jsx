import React from 'react';

const Team = () =>
  (<div className="container teamMember">
    <div className="row">
      <div className="heading-title text-center">
        <h3 className="text-uppercase">Our team</h3>
        <p className="p-top-30 half-txt">We love doing great work, it's what we are all truly passionate about. We strive to provide the best interviews to inspire and motivate because we understand that this journey is challenging, but we also want to show that it's possible to become a Software Engineer without a Computer Science Degree.</p>
      </div>

      <div className="col-md-4 col-sm-4">
        <div className="team-member">
          <div className="team-img">
            <img src="teampics/bryan.jpg" alt="team member" className="img-responsive"/>
          </div>
          <div className="team-hover">
            <div className="desk">
              <h4>How's it going?</h4>
              <p>I am a huge car hobbyist, ask me anything related to cars!</p>
            </div>
            <div className="s-link">
                <a target="blank" href="https://www.linkedin.com/in/bryan-truong-061840149/"><i className="fa fa-linkedin"></i></a>
            </div>
          </div>
        </div>
          <div className="team-title">
            <h5>Bryan Troung</h5>
            <span>Director of Marketing</span>
          </div>
      </div>
      <div className="col-md-4 col-sm-4">
        <div className="team-member">
          <div className="team-img">
            <img src="teampics/eileen.jpg" alt="team member" className="img-responsive"/>
          </div>
          <div className="team-hover">
            <div className="desk">
              <h4>Hello!</h4>
              <p>Besides being a milktea fanatic, I also love to travel!</p>
            </div>
            <div className="s-link">
                <a target="blank" href="https://www.linkedin.com/in/eileen-zhong/"><i className="fa fa-linkedin"></i></a>
            </div>
          </div>
        </div>
        <div className="team-title">
            <h5>Eileen Zhong</h5>
            <span>Software Engineer</span>
        </div>
      </div>

      <div className="col-md-4 col-sm-4">
        <div className="team-member">
          <div className="team-img">
            <img src="teampics/hernan.jpg" alt="team member" className="img-responsive"/>
          </div>
          <div className="team-hover">
            <div className="desk">
              <h4>Can I fix a bug for you?</h4>
              <p>I love to introduce myself as a hardcore Coder.</p>
            </div>
            <div className="s-link">
                <a target="blank" href="https://www.linkedin.com/in/hernan-j-m-1a0759139/"><i className="fa fa-linkedin"></i></a>
            </div>
          </div>
        </div>
          <div className="team-title">
            <h5>Hernan Mendez</h5>
            <span>Software Engineer</span>
          </div>
      </div>  
    </div>

    <div className="row"> 
      <div className="col-md-4 col-sm-4">
        <div className="team-member">
          <div className="team-img">
            <img src="teampics/johnny.jpg" alt="team member" className="img-responsive"/>
          </div>
          <div className="team-hover">
            <div className="desk">
              <h4>Hi!</h4>
              <p>Besides creating content, you can always find me taking pictures!</p>
            </div>
            <div className="s-link">
                <a target="blank" href="https://www.linkedin.com/in/johnny-liu-9975667b/"><i className="fa fa-linkedin"></i></a>
            </div>
          </div>
        </div>
        <div className="team-title">
            <h5>Johnny Liu</h5>
            <span>Director of Content</span>
        </div>
      </div>
      <div className="col-md-4 col-sm-4">
        <div className="team-member">
          <div className="team-img">
            <img src="teampics/joshua.jpg" alt="team member" className="img-responsive"/>
          </div>
          <div className="team-hover">
            <div className="desk">
              <h4>What's up?</h4>
              <p>I love making things whether it's websites with code, drawings with pen and paper, or a smile from telling a joke.</p>
            </div>
            <div className="s-link">
                <a target="blank" href="https://www.linkedin.com/in/joshua-chang-45852583/"><i className="fa fa-linkedin"></i></a>
            </div>
          </div>
        </div>
        <div className="team-title">
            <h5>Joshua Chang</h5>
            <span>Software Engineer</span>
        </div>
      </div>
      <div className="col-md-4 col-sm-4">
        <div className="team-member">
          <div className="team-img">
            <img src="teampics/joycelyn.jpg" alt="team member" className="img-responsive"/>
          </div>
          <div className="team-hover">
            <div className="desk">
              <h4>Hi There!</h4>
              <p>Ask me about my side projects!</p>
            </div>
            <div className="s-link">
                <a target="blank" href="https://www.linkedin.com/in/joycelyn-gee-78735bb7/"><i className="fa fa-linkedin"></i></a>
            </div>
          </div>
        </div>
          <div className="team-title">
            <h5>Joycelyn Gee</h5>
            <span>Software Engineer</span>
          </div>
      </div> 
    </div>
    <div className="row">
    <div className="col-md-4 col-sm-4">

    </div>
    <div className="col-md-4 col-sm-4">
        <div className="team-member">
          <div className="team-img">
            <img src="teampics/rai.jpg" alt="team member" className="img-responsive"/>
          </div>
          <div className="team-hover">
            <div className="desk">
              <h4>Hello World</h4>
              <p>I love to create; I love to write, code, and think!</p>
            </div>
            <div className="s-link">
                <a target="blank" href="https://www.linkedin.com/in/rai-lee-38061696/"><i className="fa fa-linkedin"></i></a>
            </div>
          </div>
        </div>
          <div className="team-title">
            <h5>Rai Lee</h5>
            <span>Founder</span>
          </div>
      </div> 
    </div>

  </div>);

export default Team;