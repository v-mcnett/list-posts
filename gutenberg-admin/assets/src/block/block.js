import './style.scss';
import './editor.scss';
import { PostList } from '../components/PostList';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor
const { Component } = wp.element;
const { TextControl } = wp.components;

class mySelectPosts extends Component {

    constructor(props) {
      super( ...arguments );
      this.props = props;
      this.state = {
			  posts: [],
			  loading: false,
      };
        
      this.onChangeSelectedPostCount = this.onChangeSelectedPostCount.bind(this);
      this.onChangePage = this.onChangePage.bind(this);
          
    }

    componentDidMount() {
      this.setState({ loading: true });
      this.getPosts(this.props.selectedPostCount, 1);

    }

    // Selected post count 
    onChangeSelectedPostCount(value) {

       this.props.setAttributes( {
        selectedPostCount: parseInt(value)
      });

      this.setState({ loading: true });

      this.getPosts(value, 1);

      } 
    
      onChangePage(value) {

        this.props.setAttributes( {
            currentPage: parseInt(value)
        });

        this.setState({ loading: true });
        this.getPosts(this.props.attributes.selectedPostCount, value);
      
      }

    getPosts(per_page, current_page) {
        wp.apiFetch( { path: '/wp/v2/posts?per_page='+ per_page + '&page=' + current_page} )
        .then((posts) => {
        // TODO: Handle errors, 0 posts 
        console.log(posts);
        console.log(this.props);
        
       // console.log('total pages', response.headers['x-wp-totalpages']);
        this.setState({ loading: false });

        this.props.setAttributes( {
            selectedPostCount: parseInt(per_page),
            currentPage: parseInt(current_page),
           // pagesTotal: parseInt(pagesTotal),
            posts: posts,
          });
    } );

    }

    render() {
         return [
            // If we are focused on this block, create the inspector controls.
              !! this.props.isSelected && ( <InspectorControls key='inspector'>
               <TextControl
                label="Number of Posts to Display"
                value={this.props.attributes.selectedPostCount}
                onChange = {this.onChangeSelectedPostCount}
                type="number"
                    />
                </InspectorControls>
              ), 
             <PostList posts={this.props.attributes.posts} />
             ]
      }
}


registerBlockType('react-block/main', {   
    title: __( 'List Posts' ),
    icon: 'format-aside',
    keywords: [
		__( 'posts' ),
		__( 'List Posts' ),
        __( 'react-block' ),
        ],
    category: 'common',
    attributes: {
        selectedPostCount: {
            type: 'number',
            default: 10,
        },
        currentPage: {
            type: 'number',
            default: 1,
        },
        pagesTotal: {
            type: 'number',
            default: 1
        }
      },

    edit: mySelectPosts,

    save() {
        return null;
    }  

  
  });