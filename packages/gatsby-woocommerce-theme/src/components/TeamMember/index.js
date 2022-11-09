import { Link } from 'gatsby';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import './TeamMember.scss';

function TeamMember({ heading, teamMembers }) {

  const { width } = useWindowDimensions();
  const chunkArray = (arr, size) => {
    var groupedArray = [];
    for(var i = 0; i < arr.length; i += size) {
      groupedArray.push(arr.slice(i, i+size));
    }
    return groupedArray ;
  }

  return (
    <div className='team-member'>
      <div className='team-member_title'>{heading}</div>
      <div className='team-member_content'>
        {width > 1024 ?
        <>
          {teamMembers && teamMembers.length > 0 && chunkArray(teamMembers, 4).map(
            (item,index) =>
            <Row key={index}>
              {item?.map((el) =>
                <Col lg={3} md={4} sm={6} xs={12} className="member-item">
                <div className='box-image'>
                  <img src={el.image.sourceUrl} alt={'imageMember'} />
                </div>
                <div className='team-name'>{el.name}</div>
                <div className='team-position'>{el.position}</div>
                <div className='team-location'>{el.location}</div>
                <a href={`tel:${el.phone}`} className='team-phone'>{el.phone}</a>
                <a href={`mailto:${el.email}`} className='team-email'>{el.email}</a>
              </Col>
              )} 
            </Row>
          )}
          </>
          : width > 768 ?
          <>
          {teamMembers && teamMembers.length > 0 && chunkArray(teamMembers, 3).map(
            (item,index) =>
            <Row key={index}>
              {item?.map((el) =>
                <Col lg={3} md={4} sm={6} xs={12} className="member-item">
                <div className='box-image'>
                  <img src={el.image.sourceUrl} alt={'imageMember'} />
                </div>
                <div className='team-name'>{el.name}</div>
                <div className='team-position'>{el.position}</div>
                <div className='team-location'>{el.location}</div>
                <a href={`tel:${el.phone}`} className='team-phone'>{el.phone}</a>
                <a href={`mailto:${el.email}`} className='team-email'>{el.email}</a>
              </Col>
              )} 
            </Row>
          )}
          </>
          : width > 576 ?
          <>
          {teamMembers && teamMembers.length > 0 && chunkArray(teamMembers, 2).map(
            (item,index) =>
            <Row key={index}>
              {item?.map((el) =>
                <Col lg={3} md={4} sm={6} xs={12} className="member-item">
                <div className='box-image'>
                  <img src={el.image.sourceUrl} alt={'imageMember'} />
                </div>
                <div className='team-name'>{el.name}</div>
                <div className='team-position'>{el.position}</div>
                <div className='team-location'>{el.location}</div>
                <a href={`tel:${el.phone}`} className='team-phone'>{el.phone}</a>
                <a href={`mailto:${el.email}`} className='team-email'>{el.email}</a>
              </Col>
              )} 
            </Row>
          )}
          </>
          :
          <>
          {teamMembers && teamMembers.length > 0 && chunkArray(teamMembers, 1).map(
            (item,index) =>
            <Row key={index}>
              {item.map((el) =>
                <Col lg={3} md={4} sm={6} xs={12} className="member-item">
                <div className='box-image'>
                  <img src={el.image.sourceUrl} alt={'imageMember'} />
                </div>
                <div className='team-name'>{el.name}</div>
                <div className='team-position'>{el.position}</div>
                <div className='team-location'>{el.location}</div>
                <a href={`tel:${el.phone}`} className='team-phone'>{el.phone}</a>
                <a href={`mailto:${el.email}`} className='team-email'>{el.email}</a>
              </Col>
              )} 
            </Row>
          )}
          </>
          }
        </div>
      </div>
  );
}

export default TeamMember;
