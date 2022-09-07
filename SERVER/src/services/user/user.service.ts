import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from 'src/schemas/post.schema';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
  ) { }

  async createUser(user: User) {
    try {
      if (!user.email || !user.firstName || !user.lastName) {
        throw new HttpException(
          'Please fill all the information',
          HttpStatus.BAD_REQUEST,
        );
      }

      const isExits = await this.userModel.findOne({ email: user.email });

      if (!isExits) {
        let createdUser = new this.userModel(user);
        let _user = await createdUser.save();
        return _user;
      } else {
        throw new HttpException('Email already exits', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllUsers() {
    return await this.userModel.find().exec();
  }

  async findUserById(id: string) {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      }
      return user;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findUserByUid(uid: string) {
    try {
      const user = await this.userModel.findOne({ uid: uid });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      }
      return user;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateUser(id: string, user: User) {
    try {
      const updateUser = await this.userModel.findByIdAndUpdate(id, user, {
        new: true,
      });
      if (!updateUser) {
        throw new HttpException('Update Failure', HttpStatus.BAD_REQUEST);
      }
      return updateUser;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findUserByEmail(email: string) {
    try {
      return await this.userModel.findOne({ email }).populate("posts", "", this.postModel);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async saveInterests(interests: string[], email: string) {
    try {
      return await this.userModel.findOneAndUpdate(
        { email },
        { interests },
        { new: true },
      );
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updatePostUser(userId: string, postId) {
    try {
      return await this.userModel.findByIdAndUpdate(
        userId,
        {
          $push: {
            posts: postId
          }
        }
      )
    } catch (error) {

    }
  }
}
