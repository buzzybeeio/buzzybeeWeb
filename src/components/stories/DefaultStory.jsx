import React from 'react'
import ReactDOMServer from 'react-dom/server'

var Story = function () {
  return (
    <div className="container story">
      <img className="narrator-pic" src="profilepics/najee.jpg" alt="" />
      <h4 className="story-title"><em>Najee, Software Trainer at Hack the Hood</em></h4>
      <p><em>This week we got a chance to interview Najee Amaranth. He is a Software Trainer at Hack the Hood. Despite not having a computer science degree, Najee has managed to break into the tech industry through hard work and dedication. Here is the interview:</em></p>
      <p><strong>Can you tell us a little bit about your background?</strong></p>
      <p>“I come from Oakland, I come from a non-standard community, I come from a non-standard family. Growing up, I had a lot of drive towards helping the community although I wasn’t always as mature about it as I am now or even as dedicated as I am now, but I was always dedicated in my heart and I made actions towards that. That drive has led me to where I am at.”</p>
      <p><strong>How did that drive inspire you towards becoming a software engineer?</strong></p>
      <p>“As a software engineer, I can help people through the software that I built and through teaching the next generation on how to build software. I work with Hack the Hood and we specifically work with kids in underserved communities and I think that I can connect with the students because we have similar backgrounds.”</p>
      <p><strong>You mentioned Hack the Hood, can you tell us a little bit more about it?</strong></p>
      <p> “Hack the Hood teaches kids from underrepresented backgrounds valuable skills such as entrepreneurship, web design, web development, basic software so that they can make a living for themselves and compete in the current market. Kids who have gone through Hack the Hood have received job offers. It’s a very valuable program because they are given resources, skills, and connections.”</p>
      <p><strong>Who can apply? How much does it cost?</strong></p>
      <p>“Depending on the cohort, it ranges from people through the ages of 16 to 24. You can go to their webpage, www.hackthehood.org, and apply. Even if you’re a little bit outside of the age group, you can still apply. It’s completely free!”</p>
      <p><strong>Let’s go back to you, how long have you been a software engineer and how do you like it?</strong></p>
      <p>“For a year and a half now, and I really like it. It’s a lot of fun, you have a lot of flexibility but you also have a lot of capability. You can set up anywhere and work. Plus, you can get the knowledge basically for free.”</p>
      <p><strong>For people who want to become a software engineer, what route would you suggest</strong></p>
      <p>“Learn how to Google.”</p>
      <p><strong>But what if someone wants more structure, because there’s just too much to Google.</strong></p>
      <p>“That’s true. I would say learn some HTML, CSS, JavaScript from free sources (FreeCodeCamp, Codecademy) then learn some Python. And then build a website, and after you build out your website, build out some features and once you build out your features, change everything.”</p>
      <p><strong>Would you advise people to go to a bootcamp?</strong></p>
      <p>“If they needed it. But I think that working independently is probably the best thing that you can do. If you want to be a software engineer, build an app, it is as simple as that. Take something that you do every day and see if you can create an app for it. Start with the basics, I would suggest start with JavaScript because it’s simple. I think that bootcamps are too expensive and some people who come out of bootcamps are not that good. I think that I can code because I do a lot of research on my own. Figure out how you learn best and apply that to learning software.” 
</p>
      <p><em>For more awesome stories check out our <a href="https://www.facebook.com/buzzybee.io/" target="_blank">facebook</a> page!</em></p>
    </div>
  )
}

export default ReactDOMServer.renderToStaticMarkup(<Story />)