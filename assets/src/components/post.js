import moment from 'moment';

/**
 * Post Component.
 *
 * @param {string} postTitle - Current post title.
 * @param {Integer} postId - Current post ID
 * @param {string|boolean} featured_image - Posts featured image
 * @param {string|boolean} excerpt - Post excerpt
 * @param {string|boolean} link - Link to full post
 * @param {string|boolean} author name - Author post
 * @returns {*} Post HTML.
 */

 export const Post = ({ title: { rendered: postTitle } = {}, id: postId, featured_image = false, excerpt: { rendered: postExcerpt } = {}, link = '', author_name = '', date_gmt }) => (
  
	<article className="post" id={postId}>
        <h3 className="post__title">{postTitle}</h3>
        <p className="post__byline">Published{' '} 
        { date_gmt &&
            <time dateTime={moment(date_gmt).utc().format()}>
                {moment(date_gmt).local().format('MMMM DD, Y')}{' '}
            </time>  
        }
         by {author_name} </p>
		<figure className="post__figure" style={{ backgroundImage: `url(${featured_image})` }}>
		</figure>
        <div className="post__excerpt" dangerouslySetInnerHTML={{__html: postExcerpt.trim()}} />

        <a href={link} className="post__morelink">Continue reading</a>
        
	</article>
);