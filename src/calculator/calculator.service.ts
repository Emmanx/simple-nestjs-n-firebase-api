import { Injectable } from '@nestjs/common';
import { OperationpDto } from './dto/operation.dto';
import * as admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

@Injectable()
export class CalculatorService {
  private readonly db = admin.firestore();

  async calculate(user: DecodedIdToken, body: OperationpDto) {
    const result = eval(body.equation);

    const operation = await this.db
      .collection('operations')
      .doc(user.uid)
      .set({
        ...body,
        result,
      });

    return {
      data: operation,
      message: 'Operation successful',
      meta: null,
    };
  }

  async history() {
    // Limit to 10
    const res = await this.db.collection('operations').limit(10).get();
    const docs = [];

    res.forEach((doc) => docs.push(doc.data()));

    return {
      data: docs,
      message: 'History fetched successfully',
      meta: null,
    };
  }
}
