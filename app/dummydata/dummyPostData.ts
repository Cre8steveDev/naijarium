export type TPost = {
  authorImg: string;
  authorName: string;
  dateCreated: Date;
  postTitle: string;
  postContent: string;
  postImg: string[];
  postViews: number;
  postComments: any[]; // Replace 'any' with the actual type of the comments if available
  category: string[];
  postId: number;
  featured: boolean;
  slug: string;
  upVotes: number;
  downVotes: number;
};

const allPosts: TPost[] = [
  // Your existing post object
  {
    authorImg: 'https://picsum.photos/id/2/200',
    authorName: '@Thomassy',
    dateCreated: new Date('2024/01/21 13:43'),
    postTitle: 'The Value of Patriotism as a Citizen',
    postContent:
      'Patriotism is a value that is often taught to us from a young age. It is a value that is often associated with love for one’s country and a willingness to defend it. But what does patriotism really mean? And how does it affect us as citizens?',
    postImg: [
      'https://picsum.photos/id/2/200',
      'https://picsum.photos/id/2/200',
    ],
    postViews: 45,
    postComments: [],
    category: ['Politics'],
    postId: 4564,
    featured: true,
    slug: 'The Value of Patriotism as a Citizen'
      .replace(' ', '-')
      .toLowerCase(),
    upVotes: 59,
    downVotes: 10,
  },
  // 19 additional post objects with dummy text/values
  {
    authorImg: 'https://picsum.photos/id/2/200',
    authorName: '@Author2',
    dateCreated: new Date('2024/03/29 09:30'),
    postTitle: 'Science and Technology in the Modern World',
    postContent: 'A look at the impact of science and technology on our lives.',
    postImg: [
      'https://picsum.photos/id/2/200',
      'https://picsum.photos/id/2/200',
    ],
    postViews: 123,
    postComments: [],
    category: ['Science'],
    postId: 111274,
    featured: false,
    slug: 'science-and-technology-in-the-modern-world',
    upVotes: 27,
    downVotes: 4,
  },
  {
    authorImg: 'https://picsum.photos/id/2/200',
    authorName: '@Author3',
    dateCreated: new Date('2024/02/17 18:30'),
    postTitle: 'The Importance of Art and Creativity',
    postContent: 'Exploring the role of art in our society.',
    postImg: [
      'https://picsum.photos/id/2/200',
      'https://picsum.photos/id/2/200',
    ],
    postViews: 78,
    postComments: [],
    category: ['Arts'],
    postId: 66574,
    featured: true,
    slug: 'the-importance-of-art-and-creativity',
    upVotes: 42,
    downVotes: 11,
  },
  {
    authorImg: 'https://picsum.photos/id/2/200',
    authorName: '@Author4',
    dateCreated: new Date('2024/04/09 11:23'),
    postTitle: 'The Power of a Positive Attitude',
    postContent: 'How a positive outlook can change your life.',
    postImg: [
      'https://picsum.photos/id/2/200',
      'https://picsum.photos/id/2/200',
    ],
    postViews: 91,
    postComments: [],
    category: ['Self-Improvement'],
    postId: 9985,
    featured: false,
    slug: 'the-power-of-a-positive-attitude',
    upVotes: 38,
    downVotes: 3,
  },
  {
    authorImg: 'https://picsum.photos/id/2/200',
    authorName: '@Author5',
    dateCreated: new Date('2024/03/16 17:18'),
    postTitle: 'Environmental Sustainability: A Pressing Issue',
    postContent:
      'The importance of protecting our planet for future generations.',
    postImg: [
      'https://picsum.photos/id/2/200',
      'https://picsum.photos/id/2/200',
    ],
    postViews: 52,
    postComments: [],
    category: ['Environment'],
    postId: 678503,
    featured: true,
    slug: 'The Value of Patriotism as a Citizen'
      .replace(' ', '-')
      .toLowerCase(),
    upVotes: 59,
    downVotes: 10,
  },
];

export default allPosts;
