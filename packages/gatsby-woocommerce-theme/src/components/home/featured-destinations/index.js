import React, { memo } from 'react';
import ButtonViewMore from '../../../common/ButtonViewMore';
import ProjectCardList from '../../projects/ProjectCardList';
import './style.scss';

function FeaturedDestinations({ projects, width }) {
	return (
		<div className='featured-destinations section'>
			<div className='container'>
				<div className='row item'>
					<div className='col-12 col-sm-12 col-md-8 col-lg-8 project-item'>
						<ProjectCardList projects={projects} width={width} />
					</div>
					<div className='col-12 col-sm-12 col-md-4 col-lg-4 text-item'>
						<div className='featured-destinations-item'>
							<div className='featured-destinations-item__text-with-des'>
								<p className='big-text'>featured destinations</p>
								<p className='small-text'>
									Get inspiration on how Cafés, Restaurants, Hotels, Resorts,
									Food Courts, Aged Care Facilities and Event Venues have used
									the commercial and hospitality furniture they have purchased
									from us.
								</p>
							</div>
						</div>
						<ButtonViewMore slug='projects' />
					</div>
				</div>
			</div>
		</div>
	);
}

export default memo(FeaturedDestinations);
