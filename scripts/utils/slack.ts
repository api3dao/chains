import { WebClient } from '@slack/web-api';

// Set the following environment variables to also notify to Slack
const channel = process.env.SLACK_CHANNEL;
const token = process.env.SLACK_TOKEN;
const client = new WebClient(token);

export async function postSlackMessage(text: string) {
  if (!token || !channel) {
    console.log(`Attempted to notify Slack without a Slack token and channel. Skipping`);
    return;
  }
  return await client.chat.postMessage({ channel, text });

}
