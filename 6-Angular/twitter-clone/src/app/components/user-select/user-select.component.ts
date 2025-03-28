
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-user-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.css']
})
export class UserSelectComponent implements OnInit {
  users: any[] = [];
  posts: any[] = [];
  comments: any[] = [];
  selectedUserId: number = 1; 
  selectedPostId: number = 0; 

  constructor(private userService: UserService, private postService: PostService, private commentService: CommentService
  ) {}

  ngOnInit(): void {
    // Fetch users
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.fetchPosts(this.selectedUserId);
    });
  }

  onUserChange(event: any) {
    this.selectedUserId = event.target.value;
    this.fetchPosts(this.selectedUserId);
  }

  fetchPosts(userId: number) {
    this.postService.getPostsByUser(userId).subscribe((data) => {
      this.posts = data;
      if (this.posts.length > 0) {
        this.selectedPostId = this.posts[0].id; 
        this.fetchComments(this.selectedPostId);
      } else {
        this.selectedPostId = 0;
        this.comments = []; 
      }
    });
  }
  

  onPostSelect(postId: number) {
    this.selectedPostId = postId;
    this.fetchComments(postId);
  }
  

  fetchComments(postId: number) {
    this.commentService.getCommentsByPost(postId).subscribe(
      (data) => {

        this.comments = data;
      },
      (error) => {
        console.error('Error fetching comments:', error);
      }
    );
  }
  
}
