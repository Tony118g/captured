import React from 'react';
import { Container } from 'react-bootstrap';
import appStyles from '../../App.module.css';
import SecondaryNav from '../../components/SecondaryNav';

function About() {
  return (
    <>
      <Container className={`${appStyles.Content} mt-5 text-center p-4`}>
        <h2>About us</h2>
        <hr />
        <p>
          Captured is all about photography! Our goal is to provide a place for
          photography enthusiasts to interact with other like minded people.
          This is a great place to share what you can do or simply what you love
          as well as see what other people are sharing and learn from them!
        </p>
        <p>
          We strive to bring the photography community together and so we
          encourage users to share their own photographs regardless of quality
          or skill level. We also encourage users to add informational content
          on any photographs that they post such as the camera and lense that
          they used. This way, everyone can learn and benefit from each other.
          With the ability to like and comment on photographs as well as follow
          other users, interaction is effortless.
        </p>
        <p>
          Captured hosts a seperate section dedicated to photographic tour
          opportunites! Here users can view information about any available
          tours we are offering including location, duration and price! Users
          have the ability to mark whether they wish to attend or have attended
          a tour and can aslo view a list of the users that have already done
          so.
        </p>
        <p>Join the community and get stuck in!</p>
      </Container>
      <SecondaryNav mobile />
    </>
  );
}

export default About;
