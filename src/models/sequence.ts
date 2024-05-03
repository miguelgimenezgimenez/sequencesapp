import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISequence extends Document {
  sequence: [number];
  subSequences: number[][];
}

const sequenceSchema = new Schema<ISequence>({
  sequence: { type: [Number], required: true },
  subSequences: { type: [[Number]], required: true },
});

const Sequence: Model<ISequence> = mongoose.model('Sequence', sequenceSchema);

export default Sequence;
