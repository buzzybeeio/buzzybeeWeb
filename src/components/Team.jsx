/* eslint max-len: 0, object-curly-newline: 0 */
import React from 'react';

const TeamMember = ({ name, fullName, occupation, linkedIn }) => (
  <div className="team-member">
    <img src={`assets/teampics/${name}.jpg`} className="team-member-image" alt="team member" />
    <div className="team-title">
      <h4>{fullName}</h4>
      <span>{occupation}</span>
      <a target="blank" href={linkedIn}>in</a>
    </div>
  </div>
);

const team = {
  bryan: {
    fullName: 'Bryan Troung',
    msg: 'How\'s it going?',
    msg2: 'I am a huge car hobbyist, ask me anything related to cars!',
    occupation: 'Director of Marketing',
    linkedIn: 'https://www.linkedin.com/in/bryan-truong-061840149/',
  },
  eileen: {
    fullName: 'Eileen Zhong',
    msg: 'Hello!',
    msg2: 'Besides being a milktea fanatic, I also love to travel!',
    occupation: 'Software Engineer',
    linkedIn: 'https://www.linkedin.com/in/eileen-zhong/',
  },
  hernan: {
    fullName: 'Hernan Mendez',
    msg: 'Can I fix a bug for you?',
    msg2: 'I love to introduce myself as a hardcore Coder.',
    occupation: 'Software Engineer',
    linkedIn: 'https://www.linkedin.com/in/hernan-j-m-1a0759139/',
  },
  johnny: {
    fullName: 'Johnny Liu',
    msg: 'Hi!',
    msg2: 'Besides creating content, you can always find me taking pictures!',
    occupation: 'Director of Content',
    linkedIn: 'https://www.linkedin.com/in/johnny-liu-9975667b/',
  },
  joshua: {
    fullName: 'Joshua Chang',
    msg: 'What\'s up?',
    msg2: `
    I love making things whether it's websites with code,
    drawings with pen and paper,
    or a smile from telling a joke.
    `,
    occupation: 'Software Engineer',
    linkedIn: 'https://www.linkedin.com/in/joshua-chang-45852583/',
  },
  joycelyn: {
    fullName: 'Joycelyn Gee',
    msg: 'Hi There!',
    msg2: 'Ask me about my side projects!',
    occupation: 'Software Engineer',
    linkedIn: 'https://www.linkedin.com/in/joycelyn-gee-78735bb7/',
  },
  rai: {
    fullName: 'Rai Lee',
    msg: 'Hello World!',
    msg2: 'I love to create; I love to write, code, and think!',
    occupation: 'Founder',
    linkedIn: 'https://www.linkedin.com/in/rai-lee-38061696/',
  },
  wayne: {
    fullName: 'Wayne Banks',
    msg: 'What\'s good?',
    msg2: '\'No matter how good the team… if we’re not solving the right problem, the project fails. – Woody Williams\'',
    occupation: 'Product Manager',
    linkedIn: 'https://www.linkedin.com/in/waynebanksii/',
  },
};

const teamArray = Object.keys(team);
const inRows = [];
for (let i = 0; i < teamArray.length; i += 3) {
  inRows.push(teamArray.slice(i, i + 3));
}

export default () => (
  <div style={{ backgroundColor: 'white', padding: '20px 0' }}>
    <div className="container">
      <h3>Meet the Team</h3>
      <p className="team-text indented">We love doing great work, it's what we are all truly passionate about. We strive to provide the best interviews to inspire and motivate because we understand that this journey is challenging, but we also want to show that it's possible to become a Software Engineer without a Computer Science Degree.</p>
      <div className="team-members">
        {
          teamArray.map(name => <TeamMember name={name} {...team[name]} key={name} />)
        }
      </div>
    </div>
  </div>
);
