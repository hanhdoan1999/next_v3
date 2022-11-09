import { Link } from 'gatsby';
import React from 'react';
import ArrowRight from '../../components/icons/ArrowRight';
import './style.scss';

function CardRelatedProject({ title, date, slug, featuredImage }) {
	return (
		<div className='col-12 col-sm-6 col-md-4 col-lg-4'>
			<div className='card-related-project'>
				<Link to={`/projects/${slug}`}>
					<div className='card-item'>
						<div className='img-card-item'>
							<img
								alt='place holder'
								src={featuredImage && featuredImage.node.mediaItemUrl}
							/>
						</div>
						<div className='infor'>
							<div className='d-flex align-items-center justify-content-between'>
								<p className='title'>{title}</p>
								<span className='icon d-flex'>
									<ArrowRight />
								</span>
							</div>
							<div className='date'>
								<span>{date}</span>
							</div>
						</div>
					</div>
				</Link>
			</div>
		</div>
	);
}

export default CardRelatedProject;
