#!/usr/bin/env python3
"""
IRIS Chatbot Monitor
A simple monitoring script to check the health of the IRIS chatbot
"""

import json
import sys
import time
from datetime import datetime

import requests


def check_health(url):
    """Check the health endpoint of the chatbot"""
    try:
        start_time = time.time()
        response = requests.get(f"{url}/health", timeout=10)
        end_time = time.time()
        response_time = (end_time - start_time) * 1000

        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health Check Successful")
            print(f"   Status: {data.get('status', 'Unknown')}")
            print(f"   Service: {data.get('service', 'Unknown')}")
            print(f"   Server Time: {data.get('server_time', 'Unknown')}")
            print(f"   Response Time: {response_time:.2f}ms")
            return True
        else:
            print(f"❌ Health Check Failed")
            print(f"   Status Code: {response.status_code}")
            print(f"   Response: {response.text[:200]}...")
            return False

    except requests.exceptions.Timeout:
        print(f"❌ Health Check Timeout")
        return False
    except requests.exceptions.ConnectionError:
        print(f"❌ Health Check Connection Error")
        return False
    except Exception as e:
        print(f"❌ Health Check Error: {str(e)}")
        return False


def test_chat(url, test_query="What is IRIS?"):
    """Test the chat endpoint with a simple query"""
    try:
        start_time = time.time()
        response = requests.post(
            f"{url}/chat",
            json={"query": test_query},
            timeout=30,
            headers={"Content-Type": "application/json"},
        )
        end_time = time.time()
        response_time = (end_time - start_time) * 1000

        if response.status_code == 200:
            data = response.json()
            print(f"✅ Chat Test Successful")
            print(f"   Query: {test_query}")
            print(f"   Response Length: {len(data.get('response', ''))} chars")
            print(f"   Contains HTML: {data.get('contains_html', False)}")
            print(f"   Response Time: {response_time:.2f}ms")
            return True
        elif response.status_code == 429:
            print(f"⚠️ Chat Test Rate Limited")
            print(f"   Response: {response.json().get('error', 'Unknown error')}")
            return False
        else:
            print(f"❌ Chat Test Failed")
            print(f"   Status Code: {response.status_code}")
            print(f"   Response: {response.text[:200]}...")
            return False

    except requests.exceptions.Timeout:
        print(f"❌ Chat Test Timeout")
        return False
    except requests.exceptions.ConnectionError:
        print(f"❌ Chat Test Connection Error")
        return False
    except Exception as e:
        print(f"❌ Chat Test Error: {str(e)}")
        return False


def main():
    """Main monitoring function"""
    # Default URL - change this to your actual URL
    url = "https://i-r-i-s-prod-website.onrender.com"

    if len(sys.argv) > 1:
        url = sys.argv[1]

    print(f"🔍 Monitoring IRIS Chatbot at: {url}")
    print(f"⏰ Check Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("-" * 50)

    # Check health
    print("1. Health Check:")
    health_ok = check_health(url)
    print()

    # Test chat functionality
    print("2. Chat Functionality Test:")
    chat_ok = test_chat(url)
    print()

    # Summary
    print("📊 Summary:")
    if health_ok and chat_ok:
        print("✅ All systems operational")
        sys.exit(0)
    elif health_ok and not chat_ok:
        print("⚠️ Health OK but chat has issues")
        sys.exit(1)
    elif not health_ok and chat_ok:
        print("⚠️ Chat OK but health check failed")
        sys.exit(1)
    else:
        print("❌ System is down")
        sys.exit(2)


if __name__ == "__main__":
    main()
