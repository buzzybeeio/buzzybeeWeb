/* eslint max-len: 0 */

import React from 'react';

const introducction = () => (
  <div>
    <img className="narrator-pic" src="assets/profilepics/david.png" alt="" />
    <h4 className="story-title"><em>David, Software Engineer at goBalto</em></h4>
    <p><em>This week we got a chance to interview David Blanchard. David went from Actor to Software Engineer, he's also passionate about teaching others how to code. Here is the interview:</em></p>
  </div>
);

const interview = () => (
  <div>
    <p><strong>Can you tell us a little bit about your background?</strong></p>
    <p>“Sure. I Grew up surrounded by farms in a small town in Northern California called Yuba City. Went to UC Berkeley where I spent 5 years getting a theater degree (thanks, dad!). After graduation, I eventually found my way down to Los Angeles where I pursued acting for about a year. And, after I got tired of wondering how I’d pay for my next meal, I moved back to the bay area to attend Hack Reactor and kickoff my career in software engineering.”</p>
    <p><strong>What made you interested in coding?</strong></p>
    <p>“I’ve always likened coding to legos without the constraints and I loved playing with legos as a kid. So, when I found myself looking for what I wanted to do after acting, coding really jumped out at me as a fun option that had equal parts, creative expression, and problem solving.”</p>
    <p><strong>What steps did you take to become a Software Engineer?</strong></p>
    <p>“I learned JavaScript on my own for about a month and then went to Hack Reactor.”</p>
    <p><strong>Would you recommend Hack Reactor?</strong></p>
    <p>“I certainly would. While I wouldn’t say the content they teach particularly stands out, I think the peer group they bring together really makes it worth it (at least it did in my experience).”</p>
    <p><strong>What are some obstacles that you had to overcome?</strong></p>
    <p>“Coming from a completely non-coding background, one of the biggest obstacles I encountered was simply building up my programming vocabulary so I wasn’t constantly googling terms people were using ubiquitously.”</p>
    <p><strong>How was your job search process like?</strong></p>
    <p>“I treated the job search process as a continuation of Hack Reactor. Kept the same schedule (13 hours a day, 6 days a week) and split my time between firing off 15 or so apps a day, completing coding challenges, and building additional side projects for my portfolio. Was lucky enough to get a good number of interviews and was able to turn them into a few different offers within a month of graduating.”</p>
    <p><strong>What are some great resources that you have come across when learning programming?</strong></p>
    <p>“I think learning by doing is always the best bet with stuff like this. And then, I’ve found that teaching has been tremendous in deepening my understanding of core concepts.”</p>
    <p><strong>Do you have any advice for people who are trying to become Software Engineers?</strong></p>
    <p>“Do it. Start building things. They’ll suck at first and that’s ok. Sucking is the first step in getting really good at something.”</p>
    <p><strong>Are you still constantly having to learn new material?</strong></p>
    <p>“I don’t have to learn new material too frequently at this point (fairly deep into a specific problem niche at work at this point). But I like to play around with new technologies just to keep current with what the cool kids are talking about. And while I’m not having to learn new stuff, I will say that I’m constantly faced with new problems.”</p>
    <p><strong>Any last thoughts/advice?</strong></p>
    <p>“When in doubt, drink beer.”</p>
    <p><em>For more awesome stories check out our <a href="https://www.facebook.com/buzzybee.io/" target="_blank" rel="noopener noreferrer">facebook</a> and <a href="https://medium.com/@buzzybeeio" target="_blank" rel="noopener noreferrer">medium</a> page!</em></p>
  </div>
);

export default { introducction, interview };
